import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentQuestion.module.css";
import { useSpeech } from "react-text-to-speech";

export const StudentQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const quizId = location.state?.quizId;
  const username = location.state?.username;
  const grade = location.state?.grade;
  const hasSubmittedRef = useRef(false);

  const [promptIndex, setPromptIndex] = useState(location.state?.promptIndex || 0);
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(location.state?.totalScore || 0);
  const [maxScore, setMaxScore] = useState(0);

  const [studentInfo, setStudentInfo] = useState({
    username: sessionStorage.getItem('username') || '',
    grade: sessionStorage.getItem('grade') || '',
    classcode: sessionStorage.getItem('classcode') || ''
  });
  
  const {
    Text,
    speechStatus,
    start,
    pause,
    stop
  } = useSpeech({ text: prompt });

  useEffect(() => {
    if (!quizId) {
      setPrompt("No quiz ID available.");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://ila1.pythonanywhere.com/api/quiz/${quizId}/get-all-questions/`
        );
        if (!response.ok) throw new Error("Failed to fetch questions.");
        const data = await response.json();

        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          const uniquePrompts = [...new Set(data.questions.map(q => q.prompt))];

          if (promptIndex >= uniquePrompts.length && !hasSubmittedRef.current) {
            hasSubmittedRef.current = true;
            await submitScore(data.max_score);
            return;
          }

          setPrompt(uniquePrompts[promptIndex] || "No more prompts.");
        } else {
          setPrompt("No questions found for this quiz.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setPrompt("Error fetching questions.");
      }
    };

    fetchQuestions();
  }, [quizId, promptIndex]);

  const toAnswerPage = () => {
    const filteredQuestions = questions.filter(q => q.prompt === prompt);
    navigate("/answer", {
      state: {
        questions: filteredQuestions,
        quizId,
        promptIndex,
        totalScore,
      },
    });
  };

  const submitScore = async (maxScoreFromData) => {
    try {
      const response = await fetch("https://ila1.pythonanywhere.com/api/submit-score/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: studentInfo.username,
          grade: studentInfo.grade,
          quizId,
          score: totalScore,
          classcode: studentInfo.classcode
        }),
      });

      const result = await response.json();
      console.log(maxScore)
      if (response.ok) {
        navigate("/scorereport", {
          state: {
            score: totalScore,
            max_score: maxScoreFromData,
            message: result.message || "Score submitted successfully",
          },
        });
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Error submitting score. Please try again.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.questionContainer}>
        <h1 className={styles.question} onClick={toAnswerPage}>
          <Text />
        </h1>
  
        <div className={styles.ttsControls} style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          {speechStatus !== "started" ? (
            <button onClick={start}>🔊 Play</button>
          ) : (
            <button onClick={pause}>⏸️ Pause</button>
          )}
          <button onClick={stop}>⏹️ Stop</button>
        </div>
      </div>
    </div>
  );
  
};
