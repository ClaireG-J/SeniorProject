import React from 'react';
import styles from './StudentQuiz.module.css';
import answerImage from '../../Assets/heart.png';

export const StudentQuiz = () => {
  return (
    <div className={styles.background}>
      {/* Question Number */}
      <div className={styles.questionNumber}>Question 1</div>

      <div className={styles.questionContainer}>
        <h1 className={styles.question}>What is 5 + 3?</h1>
      </div>

      <div className={styles.answersContainer}>
        <div className={styles.answerBox}>
          <img src={answerImage} alt="Answer 1" className={styles.answerImage} />
        </div>
        <div className={styles.answerBox}>
          <img src={answerImage} alt="Answer 2" className={styles.answerImage} />
        </div>
        <div className={styles.answerBox}>
          <img src={answerImage} alt="Answer 3" className={styles.answerImage} />
        </div>
      </div>
    </div>
  );
};
