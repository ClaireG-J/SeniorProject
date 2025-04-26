import React, { useState } from 'react';
import styles from './TeacherLogin.module.css';
import emailIcon from '../../Assets/email.png';
import passwordIcon from '../../Assets/password.png';
import { useNavigate } from "react-router-dom";

export const TeacherLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const toHome = () => {
        navigate('/');
    };

    const toSignup = () => {
        navigate('/signup');
    };

    const toDashboard = () => {
        navigate('/dashboard');
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("teacherName", data.teacher);
                localStorage.setItem("teacherCode", data.classcode);

                // Navigate to dashboard
                toDashboard();
            } else {
                setError(data.error || "An error occurred");
            }
        } catch (error) {
            setError("Network error: " + error.message);
        }
    };


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.text}>Welcome!</div>
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label htmlFor="email" className={styles.visuallyHidden}>
                            Email
                        </label>
                        <img src={emailIcon} alt="Email Icon" />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password" className={styles.visuallyHidden}>
                            Password
                        </label>
                        <img src={passwordIcon} alt="Password Icon" />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.forgotPassword}>
                    Forgot Password? <span className={styles.clickHere} onClick={() => navigate('/forgot-password')}>Click Here!</span><br />
                    Not a teacher? <span className={styles.clickHere} onClick={toHome}>Click Here!</span>
                </div>

                <div className={styles.submitContainer}>
                    <div
                        className={styles.submit}
                        onClick={handleLogin}
                    >
                        Login
                    </div>
                    <div
                        className={styles.submit}
                        onClick={toSignup}
                    >
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );
};
