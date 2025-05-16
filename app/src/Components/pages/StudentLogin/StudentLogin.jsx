import React, { useState } from 'react';
import styles from './StudentLogin.module.css'; 
import frog_image from '../../Assets/frogButterfly.png';
import { useLocation, useNavigate } from "react-router-dom";

export const StudentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [name, setName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [subject, setSubject] = useState('ELA');  // Default subject
  const selectedGrade = location.state?.grade;

  const tohome = () => {
    navigate('/teacherlogin');
  };

  const handleLogin = async () => {
    if (!name.trim() || !teacherCode.trim()) {
      alert("Please enter your name and teacher code.");
      return;
    }

    try {
      const response = await fetch('https://ila1.pythonanywhere.com/api/student-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: name, 
          classcode: teacherCode, 
          grade: selectedGrade,
          subject: subject
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid login. Please check your name and teacher code.');
      }

      const data = await response.json();
      const { username, grade, quiz_id } = data;

      sessionStorage.setItem('username', username);
      sessionStorage.setItem('grade', selectedGrade);
      sessionStorage.setItem('classcode', teacherCode);
      sessionStorage.setItem('subject', subject);

      navigate('/question', { state: { quizId: quiz_id } });

    } catch (error) {
      console.error('Login Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className={styles['student-login-container']}>
      <div className={styles['login-body']}>
        <div className={styles['frog-image-container']}>
          <img src={frog_image} alt="frog" className={styles['frog-image']} />
        </div>
        
        <div className={styles['form-container']}>
          <h3 className={styles['form-title']}>Name</h3>
          <input 
            type="text" 
            className={styles['form-input']} 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />

          <h3 className={styles['form-title']}>Teacher Code</h3>
          <input 
            type="text" 
            className={styles['form-input']} 
            value={teacherCode} 
            onChange={(e) => setTeacherCode(e.target.value)} 
          />

          <h3 className={styles['form-title']}>Subject</h3>
          <select 
            className={styles['form-input']} 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="ELA">ELA</option>
            <option value="MATH">MATH</option>
          </select>

          <div className={styles.home}>
            Not a student? <span className={styles.clickHere} onClick={tohome}>Click Here!</span>
          </div>
          <button className={styles['form-submit']} onClick={handleLogin}>Let's Go!</button>
        </div>
      </div>
    </div>
  );
};
