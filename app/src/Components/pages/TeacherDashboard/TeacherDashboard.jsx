import React, { useEffect, useState } from 'react';
import styles from './TeacherDashboard.module.css';
import { useNavigate } from "react-router-dom";

export const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [teacherName, setTeacherName] = useState('');
    const [teacherCode, setTeacherCode] = useState('');

    useEffect(() => {
        const name = localStorage.getItem("teacherName") || "Teacher";
        const code = localStorage.getItem("teacherCode") || "N/A";
        setTeacherName(name);
        setTeacherCode(code);
    }, []);

    const toScore = (grade) => {
        navigate('/teacherscore', { state: { teacherCode, grade } });
    };
    
    const tohome = () => {
        navigate('/');
    };
    
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.topRow}>
                <div className={styles.name}>Hello {teacherName}</div>
                <div className={styles.codeWrapper}>
                    <div className={styles.codeTitle}>This is your Teacher Code:</div>
                    <div className={styles.code}>{teacherCode}</div>
                </div>
                <button className={styles['home-button']} onClick={tohome}>Logout</button>
                <div className={styles.gradePrompt}>Select the grade that you would like to view</div>
            </div>

            <div className={styles.bottomRow}>
                <div className={styles.buttons}>
                    <div className={styles.button} onClick={() => toScore(3)}>Grade 3</div>
                    <div className={styles.button} onClick={() => toScore(4)}>Grade 4</div>
                    <div className={styles.button} onClick={() => toScore(5)}>Grade 5</div>
                </div>
            </div>
        </div>
    );
};
