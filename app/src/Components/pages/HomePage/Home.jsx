import React from 'react';
import styles from './Home.module.css';
import dog_image from '../../Assets/dog.png';
import fish_image from '../../Assets/fish.png';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const toStudentLogin = (grade) => {
    navigate('/studentlogin', { state: { grade } });
  };

  const toTeacherLogin = () => {
    navigate('/teacherlogin')
  }

  return (
    <div className={styles.container}>
      <button className={styles["teacher-button"]} onClick={toTeacherLogin}>Teacher</button>
      <div className={styles.header}>
        <h1 className={styles.title}>Let’s Practice!</h1>
        <div className={styles["grade-buttons"]}>
          <button className={styles["grade-button"]} onClick={() => toStudentLogin(3)}>Grade 3</button>
          <button className={styles["grade-button"]} onClick={() => toStudentLogin(4)}>Grade 4</button>
          <button className={styles["grade-button"]} onClick={() => toStudentLogin(5)}>Grade 5</button>
        </div>
      </div>
    </div>
  );
};
