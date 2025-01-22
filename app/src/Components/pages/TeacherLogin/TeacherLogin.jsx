import React, { useState } from 'react'; 
import styles from './TeacherLogin.module.css';
import userIcon from '../../Assets/person.png';
import emailIcon from '../../Assets/email.png';
import passwordIcon from '../../Assets/password.png';

export const TeacherLogin = () => {
    const [action, setAction] = useState("Sign Up");

    const handleToggle = () => {
        setAction((prevAction) => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.text}>{action}</div>
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.inputs}>
                    {action === "Sign Up" && (
                        <div className={styles.input}>
                            <label htmlFor="name" className={styles.visuallyHidden}>
                                Name
                            </label>
                            <img src={userIcon} alt="User Icon" />
                            <input id="name" type="text" placeholder="Name" />
                        </div>
                    )}
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
                    {action === "Sign Up" && (
                        <div className={styles.input}>
                            <label htmlFor="classCode" className={styles.visuallyHidden}>
                                Class Code
                            </label>
                            <img src={userIcon} alt="Class Code Icon" />
                            <input id="classCode" type="text" placeholder="Class Code" />
                        </div>
                    )}
                </div>
                {action === "Login" && (
                    <div className={styles.forgotPassword}>
                        Forgot Password? <span className={styles.clickHere}>Click Here!</span>
                    </div>
                )}
                <div className={styles.submitContainer}>
                    <div
                        className={`${styles.submit} ${
                            action === "Login" ? styles.gray : ""
                        }`}
                        onClick={handleToggle}
                    >
                        Sign Up
                    </div>
                    <div
                        className={`${styles.submit} ${
                            action === "Sign Up" ? styles.gray : ""
                        }`}
                        onClick={handleToggle}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
};
