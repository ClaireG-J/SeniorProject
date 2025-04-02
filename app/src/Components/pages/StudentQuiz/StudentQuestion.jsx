import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentQuestion.module.css";

export const StudentQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = location.state?.quizId;
  const [promptIndex, setPromptIndex] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState([]);

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
          setPrompt(data.questions[0].prompt); // Display the first question's text as the prompt
        } else {
          setPrompt("No questions found for this quiz.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setPrompt("Error fetching questions.");
      }
    };

    fetchQuestions();
  }, [quizId]);

  const toAnswerPage = () => {
  
    navigate("/answer", {
      state: { questions, quizId, promptIndex },
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.questionContainer}>
        <h1 className={styles.question} onClick={toAnswerPage}>
          {prompt}
        </h1>
      </div>
    </div>
  );
};
