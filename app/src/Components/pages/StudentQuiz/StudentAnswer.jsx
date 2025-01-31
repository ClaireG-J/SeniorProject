import React from 'react';
import styles from './StudentAnswer.module.css';
import answerImage1 from '../../Assets/cat1.png';
import answerImage2 from '../../Assets/cat2.png';
import answerImage3 from '../../Assets/cat3.png';
import { useNavigate } from "react-router-dom";


export const StudentAnswer = () => {
  const navigate = useNavigate();
  const toScoreReport = () => {
    navigate('/scorereport');
  }

  return (
    <div className={styles.background}>
      {/* Question Number */}
      <div className={styles.questionNumber}>Question 1</div>

      <div className={styles.questionContainer}>
        <h1 className={styles.question}>Which word describes how the kitten feels when Doreen pets its fur?</h1>
      </div>

      <div className={styles.answersContainer}>
        <div className={styles.answerBox}onClick={toScoreReport}>
          <img src={answerImage1} alt="Answer 1" className={styles.answerImage} />
        </div>
        <div className={styles.answerBox}onClick={toScoreReport}>
          <img src={answerImage2} alt="Answer 2" className={styles.answerImage} />
        </div>
        <div className={styles.answerBox}onClick={toScoreReport}>
          <img src={answerImage3} alt="Answer 3" className={styles.answerImage} />
        </div>
      </div>
    </div>
  );
};
