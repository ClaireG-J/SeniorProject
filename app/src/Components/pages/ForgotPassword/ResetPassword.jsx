import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css'; // <-- Import the new CSS!

export const ResetPassword = () => {
    const { uid, token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try {
            const response = await fetch(`https://ila1.pythonanywhere.com/api/reset-password/${uid}/${token}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Password reset successful! You can now log in.");
                setError('');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError(data.error || "Failed to reset password.");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    };

    return (
        <div className={styles.resetPasswordPage}>
            <div className={styles.resetPasswordContainer}>
                <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                <div className={styles.buttonRow}>
                    <button onClick={handleResetPassword} className={styles.submitButton}>
                        Reset Password
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
