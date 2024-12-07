import React, { useState } from 'react'; // Import useState
import './StudentLogin.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const StudentLogin = () => {
    const [action, setAction] = useState("Sign Up");

    const handleToggle = () => {
        setAction((prevAction) => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
                <div className="inputs">
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={user_icon} alt="User Icon" />
                            <input type="text" placeholder="Name" />
                        </div>
                    )}
                    <div className="input">
                        <img src={email_icon} alt="Email Icon" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="Password Icon" />
                        <input type="password" placeholder="Password" />
                    </div>
                    {action == 'Sign Up' && (
                        <div className="input">
                            <img src={user_icon} alt="Code Icon" />
                            <input type="text" placeholder="Class Code" />
                        </div>
                    )}

                </div>
                {action == 'Sign Up' ? <div></div> : <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>}
                <div className="submit-container">
                    <div
                        className={action === "Login" ? "submit gray" : "submit"}
                        onClick={handleToggle}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={handleToggle}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
};
