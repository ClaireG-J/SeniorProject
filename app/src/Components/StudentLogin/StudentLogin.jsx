import React from 'react';
import './StudentLogin.css'; // Ensure the CSS file matches this filename
import dog_image from '../Assets/dog.png'; // Replace with your frog image path

export const StudentLogin = () => {
  return (
    <div className="student-login-container">
      <div className="login-header">
        <h2>Student Login</h2>
      </div>
      <div className="login-body">
        <div className="dog-image-container">
          <img src={dog_image} alt="Dog" className="dog-image" />
        </div>
        
        <div className="form-container">
          <h3 className="form-title">Name</h3>
          <input type="text" className="form-input" placeholder="Name" />

          <h3 className="form-title">Teacher Code</h3>
          <input type="text" className="form-input" placeholder="Teacher Code" />
          <br />
          <button className="form-submit">Let's Go!</button>
        </div>
      </div>
    </div>
  );
};
