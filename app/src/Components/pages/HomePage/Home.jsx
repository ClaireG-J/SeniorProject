import React from 'react';
import styles from './Home.module.css';
import dog_image from '../../Assets/dog.png';
import fish_image from '../../Assets/fish.png';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const toStudentLogin = () => {
    navigate('/studentlogin');
  };

  const toTeacherLogin = () => {
    navigate('/teacherlogin')
  }

  return (
    <div className={styles.container}>
      <button className={styles["teacher-button"]}onClick={toTeacherLogin}>Teacher</button>
      <div className={styles.header}>
        <h1 className={styles.title}>Let’s Practice!</h1>
        <div className={styles["grade-buttons"]}>
          <button className={styles["grade-button"]} onClick={toStudentLogin}>Grade 3</button>
          <button className={styles["grade-button"]} onClick={toStudentLogin}>Grade 4</button>
          <button className={styles["grade-button"]} onClick={toStudentLogin}>Grade 5</button>
        </div>
        <div className={styles["dog-section"]}>
          <div className={styles["speech-bubble"]}>When you are ready, choose your grade!</div>
          <img src={dog_image} alt="dog" className={styles["dog-image"]} />
        </div>
      </div>
      <div className={styles["background-fish"]}>
        <img src={fish_image} alt="Fish" className={styles["fish"]} />
        <img src={fish_image} alt="Fish" className={styles["fish"]} />
      </div>
    </div>
  );
};
