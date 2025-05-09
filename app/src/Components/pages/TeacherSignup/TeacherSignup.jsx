import React, { useState } from 'react';
import styles from './TeacherSignup.module.css';
import userIcon from '../../Assets/person.png';
import emailIcon from '../../Assets/email.png';
import passwordIcon from '../../Assets/password.png';
import { useNavigate } from "react-router-dom";

export const TeacherSignup = () => {
    const navigate = useNavigate();

    // ***********************************************************************************************
    // ***Changes made to connect to backend***
    // Essentially, for everything that we have to connect to the django backend, we have to add some
    // version of this code I believe. We also must go into the html section of the file and add some
    // small adjustments. The following code just gives this react script a connection to the django
    // backend, so that information can be exchanged.

    // State to hold form input values
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        classcode: "",
    });

    const toTeacherLogin = () => {
        navigate('/teacherlogin')
    }

    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSignup = async () => {
        setError("");  // Clear any previous errors

        try {
            const response = await fetch("https://ila1.pythonanywhere.com/api/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup successful!");
                navigate('/teacherlogin'); // Redirect to login after successful signup
            } else {
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };
    //************************************************************************************************

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
                        <input id="name" name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="email" className={styles.visuallyHidden}>
                            Email
                        </label>
                        <img src={emailIcon} alt="Email Icon" />
                        <input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password" className={styles.visuallyHidden}>
                            Password
                        </label>
                        <img src={passwordIcon} alt="Password Icon" />
                        <input id="password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="classCode" className={styles.visuallyHidden}>
                            Class Code
                        </label>
                        <img src={userIcon} alt="Class Code Icon" />
                        <input id="classCode" name="classcode" type="text" placeholder="Class Code" value={formData.classcode} onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.forgotPassword}>
                    Not a teacher? <span className={styles.clickHere} onClick={toTeacherLogin}>Click Here!</span>
                </div>
                <div className={styles.submitContainer}>
                    <div className={styles.submit} onClick={handleSignup}>Sign Up</div>
                </div>

            </div>
        </div>
    );
};
