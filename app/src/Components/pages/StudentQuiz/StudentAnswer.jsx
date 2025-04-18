import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentAnswer.module.css";
import answerImage1 from "../../Assets/cat1.png";
import answerImage2 from "../../Assets/cat2.png";
import answerImage3 from "../../Assets/cat3.png";
import { useSpeech } from "react-text-to-speech";

export const StudentAnswer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location.state?.questions || [];
  const quizId = location.state?.quizId;
  const promptIndex = location.state?.promptIndex || 0;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [pointsLeft, setPointsLeft] = useState(4);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [totalScore, setTotalScore] = useState(location.state?.totalScore || 0);

  const answerImages = [answerImage1, answerImage2, answerImage3];
  const currentQuestion = questions[currentQuestionIndex];

  const {
    Text,
    speechStatus,
    start,
    pause,
    stop
  } = useSpeech({ text: currentQuestion?.question_text });

  const getAnswerImage = (optionNumber) => {
    return answerImages[optionNumber - 1];
  };

  const checkAnswer = (selectedOption) => {
    const correctAnswer = parseInt(currentQuestion.correct_answer, 10);

    if (selectedOption === correctAnswer) {
      setIsAnsweredCorrectly(true);
      const updatedScore = totalScore + pointsLeft;
      setTotalScore(updatedScore);
      setTimeout(() => {
        goToNextQuestion(updatedScore);
      }, 1000);

    } else {
      if (!disabledOptions.includes(selectedOption)) {
        setDisabledOptions((prev) => [...prev, selectedOption]);
        setPointsLeft((prev) => Math.max(prev - 1, 0));
      }
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
  

  return (
    <div className={styles.background}>
      <div className={styles.questionNumber}>
        Question {currentQuestionIndex + 1}
      </div>

      <div className={styles.questionContainer}>
        <h1 className={styles.question}>
          <Text />
        </h1>
      </div>

      <div className={styles.answersContainer}>
        {[1, 2, 3].map((option) => (
          <div
            key={option}
            className={`${styles.answerBox} 
              ${disabledOptions.includes(option) ? styles.disabled : ""}
              ${isAnsweredCorrectly && parseInt(currentQuestion.correct_answer) === option ? styles.selected : ""}
            `}
            onClick={() =>
              !disabledOptions.includes(option) && !isAnsweredCorrectly && checkAnswer(option)
            }
          >
            <img
              src={getAnswerImage(option)}
              alt={`Answer ${option}`}
              className={styles.answerImage}
            />
          </div>
        ))}
      </div>

      {isAnsweredCorrectly && (
        <div className={styles.feedback}>
          <span className={styles.correct}>Correct!</span>
        </div>
      )}
       <div className={styles.ttsControls} style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
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
