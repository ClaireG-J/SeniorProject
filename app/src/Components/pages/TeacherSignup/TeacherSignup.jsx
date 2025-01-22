import React from 'react'; 
import styles from './TeacherSignup.module.css';
import userIcon from '../../Assets/person.png';
import emailIcon from '../../Assets/email.png';
import passwordIcon from '../../Assets/password.png';
import { useNavigate } from "react-router-dom";

export const TeacherSignup = () => {
    const navigate = useNavigate();

    const tohome = () => {
        navigate('/');
    };
    const tologin = () => {
        navigate('/teacherlogin');
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.text}>Signup</div>
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.inputs}>
                        <div className={styles.input}>
                            <label htmlFor="name" className={styles.visuallyHidden}>
                                Name
                            </label>
                            <img src={userIcon} alt="User Icon" />
                            <input id="name" type="text" placeholder="Name" />
                        </div>
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
                        <div className={styles.input}>
                            <label htmlFor="classCode" className={styles.visuallyHidden}>
                                Class Code
                            </label>
                            <img src={userIcon} alt="Class Code Icon" />
                            <input id="classCode" type="text" placeholder="Class Code" />
                        </div>
                </div>
                <div className={styles.submitContainer}>
                    <div
                        className={styles.submit} 
                        onClick={tologin}
                    >
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );
};
