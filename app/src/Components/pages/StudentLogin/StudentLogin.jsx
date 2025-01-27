import React from 'react';
import styles from './StudentLogin.module.css'; 
import frog_image from '../../Assets/frog.png';
import { useNavigate } from "react-router-dom";

export const StudentLogin = () => {
  const navigate = useNavigate();
  const tohome = () => {
    navigate('/');
};

  const toQuestion = () => {
    navigate('/question');
  }

  return (
    <div className= {styles['student-login-container']}>
      <div className={styles['login-body']}>
        <div className={styles['frog-image-container']}>
          <img src={frog_image} alt="frog" className={styles['frog-image']} />
        </div>
        
        <div className={styles['form-container']}>
          <h3 className={styles['form-title']}>Name</h3>
          <input type="text" className={styles['form-input']} />

          <h3 className={styles['form-title']}>Teacher Code</h3>
          <input type="text" className={styles['form-input']} />
          <div className={styles.home}>
                        Not a student? <span className={styles.clickHere} onClick={tohome}>Click Here!</span>
          </div>
          <button className={styles['form-submit']} onClick={toQuestion}>Let's Go!</button>
        </div>
      </div>
    </div>
  );
};
