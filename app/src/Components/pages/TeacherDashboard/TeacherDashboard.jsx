import React from 'react';
import styles from './TeacherDashboard.module.css';

export const TeacherDashboard = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.topRow}>
        <div className={styles.name}>Hello Ms./Mr. _________</div>
        <div className={styles.codeWrapper}>
          <div className={styles.codeTitle}>This is your Teacher Code:</div>
          <div className={styles.code}>3frv4e</div>
        </div>
        <div className={styles.gradePrompt}>Select the grade that you would like to view</div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.buttons}>
          <div className={styles.button}>Grade 3</div>
          <div className={styles.button}>Grade 4</div>
          <div className={styles.button}>Grade 5</div>
        </div>
      </div>
    </div>
  );
};
