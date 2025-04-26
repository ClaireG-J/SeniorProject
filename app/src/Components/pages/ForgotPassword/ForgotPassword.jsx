import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/forgot-password/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Password reset email sent! Check your email.");
                setError('');
            } else {
                setError(data.error || "Failed to send reset email.");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    };

    return (
        <div className={styles.forgotPasswordPage}>
            <div className={styles.forgotPasswordContainer}>
                <h2>Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />
                <div className={styles.buttonRow}>
                    <button onClick={handleForgotPassword} className={styles.submitButton}>
                        Send Reset Email
                    </button>
                    <button onClick={() => navigate('/teacherlogin')} className={styles.backButton}>
                        Back to Login
                    </button>
                </div>
                {message && <p className={styles.successMessage}>{message}</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}

            </div>
        </div>
    );

};
