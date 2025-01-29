import React from 'react';
import styles from './StudentQuestion.module.css';
import { useNavigate } from "react-router-dom";

export const StudentQuestion= () => {
    const navigate = useNavigate();
    const toAnswer = () => {
        navigate('/answer');
      }
  return (
    <div className={styles.background}>
      <div className={styles.questionNumber}>Question 1</div>

      <div className={styles.questionContainer}>
        <h1 className={styles.question} onClick={toAnswer}>Here is a short story about a girl that found a kitten at an animal shelter. As I read, tell me how the kitten might feel in the story.</h1>
      </div>
    </div>
  );
};
