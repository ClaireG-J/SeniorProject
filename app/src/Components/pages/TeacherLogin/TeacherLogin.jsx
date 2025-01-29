import React from 'react';
import styles from './TeacherLogin.module.css';
import userIcon from '../../Assets/person.png';
import emailIcon from '../../Assets/email.png';
import passwordIcon from '../../Assets/password.png';
import { useNavigate } from "react-router-dom";

export const TeacherLogin = () => {
    const navigate = useNavigate();

    const tohome = () => {
        navigate('/');
    };

    const toSignup = () => {
        navigate('/signup');
    }

    const toDashboard = () => {
        navigate('/dashboard');
    }

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
                        <input id="email" type="email" placeholder="Email" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password" className={styles.visuallyHidden}>
                            Password
                        </label>
                        <img src={passwordIcon} alt="Password Icon" />
                        <input id="password" type="password" placeholder="Password" />
                    </div>
                </div>
                <div className={styles.forgotPassword}>
                    Forgot Password? <span className={styles.clickHere}>Click Here!</span><br />
                    Not a teacher? <span className={styles.clickHere} onClick={tohome}>Click Here!</span>
                </div>
                <div className={styles.submitContainer}>
                    <div
                        className={styles.submit}
                        onClick={toDashboard}
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
