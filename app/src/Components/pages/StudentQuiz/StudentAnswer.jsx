import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentAnswer.module.css";
import { useSpeech } from "react-text-to-speech";

export const StudentAnswer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location.state?.questions || [];
  const quizId = location.state?.quizId;
  const promptIndex = location.state?.promptIndex || 0;
  const initialScore = location.state?.totalScore || 0;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [pointsLeft, setPointsLeft] = useState(4);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [totalScore, setTotalScore] = useState(initialScore);

  const currentQuestion = questions[currentQuestionIndex];
  const currentText = currentQuestion?.question_text || "";

  const { Text, speechStatus, start, pause, stop } = useSpeech({ text: currentText });

  if (!currentQuestion) return <div>Loading question...</div>;

  const checkAnswer = (selectedOption) => {
    const correctAnswer = parseInt(currentQuestion.correct_answer, 10);
    if (selectedOption === correctAnswer) {
      setIsAnsweredCorrectly(true);
      const updatedScore = totalScore + pointsLeft;
      setTotalScore(updatedScore);
      setTimeout(() => goToNextQuestion(updatedScore), 1000);
    } else if (!disabledOptions.includes(selectedOption)) {
      setDisabledOptions((prev) => [...prev, selectedOption]);
      setPointsLeft((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToNextQuestion = (scoreToCarry) => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      const currentPrompt = currentQuestion.prompt;
      const nextPrompt = questions[nextIndex].prompt;
      if (currentPrompt !== nextPrompt) {
        navigate("/question", {
          state: {
            quizId,
            promptIndex: promptIndex + 1,
            totalScore: scoreToCarry,
          },
        });
      } else {
        setCurrentQuestionIndex(nextIndex);
        setDisabledOptions([]);
        setPointsLeft(4);
        setIsAnsweredCorrectly(false);
      }
    } else {
      navigate("/question", {
        state: {
          quizId,
          promptIndex: promptIndex + 1,
          totalScore: scoreToCarry,
        },
      });
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel(); // stop ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  const renderOption = (index, option) => {
    let fullImageUrl = null;

    if (option.image) {
      if (/^https?:\/\//.test(option.image)) {
        fullImageUrl = option.image;
      } else {
        fullImageUrl = `https://ila1.pythonanywhere.com${option.image.startsWith('/') ? '' : '/'}${option.image}`;
      }
    }

    const optionNum = index + 1;

    return (
      <div
        key={optionNum}
        className={`${styles.answerBox}
          ${disabledOptions.includes(optionNum) ? styles.disabled : ""}
          ${isAnsweredCorrectly && parseInt(currentQuestion.correct_answer, 10) === optionNum ? styles.selected : ""}
        `}
        onClick={() =>
          !disabledOptions.includes(optionNum) &&
          !isAnsweredCorrectly &&
          checkAnswer(optionNum)
        }
      >
        {fullImageUrl ? (
          <img
            src={fullImageUrl}
            alt={`Option ${optionNum}`}
            className={styles.answerImage}
            onError={() => console.warn(`Image failed to load: ${fullImageUrl}`)}
          />
        ) : (
          <div className={styles.answerText}>
            {option.text || "No text provided"}
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakText(option.text || "");
              }}
              className={styles.ttsButton}
              style={{
                marginLeft: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              aria-label={`Play option ${optionNum}`}
              title="Play text"
            >
              🔊
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.background}>

      <div className={styles.questionContainer}>
        <h1 className={styles.question}>
          <Text />
        </h1>
      </div>

      <div className={styles.answersContainer}>
        {currentQuestion.options?.map((option, idx) => renderOption(idx, option))}
      </div>

      {isAnsweredCorrectly && (
        <div className={styles.feedback}>
          <span className={styles.correct}>Correct!</span>
        </div>
      )}

      <div
        className={styles.ttsControls}
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}
      >
        {speechStatus !== "started" ? (
          <button onClick={start}>🔊 Play</button>
        ) : (
          <button onClick={pause}>⏸️ Pause</button>
        )}
        <button onClick={stop}>⏹️ Stop</button>
      </div>
    </div>
  );
};
