import React from 'react';
import styles from './StudentLogin.module.css'; 
import dog_image from '../../Assets/dog.png';
import { useNavigate } from "react-router-dom";

export const StudentLogin = () => {
  const navigate = useNavigate();
  const tohome = () => {
    navigate('/');
};

  return (
    <div className= {styles['student-login-container']}>
      <div className={styles['login-header']}>
        <h2>Student Login</h2>
      </div>
      <div className={styles['login-body']}>
        <div className={styles['dog-image-container']}>
          <img src={dog_image} alt="Dog" className={styles['dog-image']} />
        </div>
        
        <div className={styles['form-container']}>
          <h3 className={styles['form-title']}>Name</h3>
          <input type="text" className={styles['form-input']} placeholder="Name" />

          <h3 className={styles['form-title']}>Teacher Code</h3>
          <input type="text" className={styles['form-input']} placeholder="Teacher Code" />
          <div className={styles.home}>
                        Not a student? <span className={styles.clickHere} onClick={tohome}>Click Here!</span>
          </div>
          <button className={styles['form-submit']}>Let's Go!</button>
        </div>
      </div>
    </div>
  );
};
