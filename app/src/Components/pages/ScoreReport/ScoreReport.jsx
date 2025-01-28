import React from 'react';
import styles from './ScoreReport.module.css'; 
import bg_wave from '../../Assets/bgwave.png';
import frog_image from '../../Assets/frog.png';
import { useNavigate } from "react-router-dom";

export const ScoreReport = () => {
  const navigate = useNavigate();
  const tohome = () => {
    navigate('/');
};

return (
        <div className= {styles.background}>
            <button className={styles['home-button']}onClick={tohome}>Home</button>
                <div className={styles.reportbox}>
                    Your Score:<br></br>
                    20 / 21 
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