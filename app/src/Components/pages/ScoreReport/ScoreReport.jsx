import React, { useState, useEffect } from 'react';
import styles from './ScoreReport.module.css'; 
import frog_image from '../../Assets/frogWink.png';
import { useNavigate, useLocation } from "react-router-dom";

export const ScoreReport = () => {
  const location = useLocation();
  
  const [score, setScore] = useState(null);  // To store the score
  const [error, setError] = useState(null); 
  const maxScore = location.state?.max_score;

  const [studentInfo] = useState({
    username: sessionStorage.getItem('username') || '',
    grade: sessionStorage.getItem('grade') || '',
  });

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/student/${studentInfo.username}/grade/${studentInfo.grade}/score/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch score');
        }

        const data = await response.json();
        setScore(data.score);
      } catch (error) {
        setError('Failed to load score.');
      }
    };

    if (studentInfo.username && studentInfo.grade) {
      fetchScore();
    }
  }, [studentInfo]);

  const navigate = useNavigate();
  const tohome = () => {
    navigate('/');
  };

  return (
    <div className={styles.background}>
      <button className={styles['home-button']} onClick={tohome}>Home</button>
      <div className={styles.reportbox}>
        Your Score:<br />
        {score !== null ? `${score} / ${maxScore}` : 'Loading...'}
        {error && <p>{error}</p>}
      </div>
      <div className={styles['frog-image-container']}>
        <div className={styles['speech-bubble']}>
          Woohoo! You did it!
        </div>
        <img src={frog_image} alt="frog" className={styles['frog-image']} />
      </div>
    </div>
  );
};
