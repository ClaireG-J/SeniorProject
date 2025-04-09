import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentQuestion.module.css";

export const StudentQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = location.state?.quizId;
  const [promptIndex, setPromptIndex] = useState(location.state?.promptIndex || 0);
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(location.state?.totalScore || 0);


  useEffect(() => {
    if (!quizId) {
      setPrompt("No quiz ID available.");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/quiz/${quizId}/get-all-questions/`
        );
        if (!response.ok) throw new Error("Failed to fetch questions.");

        const data = await response.json();
        
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);

          const uniquePrompts = [...new Set(data.questions.map(q => q.prompt))];
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
    const currentPrompt = prompt;
    const filteredQuestions = questions.filter(
      (q) => q.prompt === currentPrompt
    );

    navigate("/answer", {
      state: {
        questions: filteredQuestions,
        quizId,
        promptIndex,
        totalScore, 
      },
    });    
  };

  return (
    <div className={styles.background}>
      <div className={styles.questionContainer}>
        <h1 className={styles.question} onClick={toAnswerPage}>
          {prompt || "Loading prompt..."}
        </h1>
      </div>
    </div>
  );
};
