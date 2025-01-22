import React from 'react';
import './Home.css';
import dog_image from '../../Assets/dog.png';
import fish_image from '../../Assets/fish.png';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const toStudentLogin = () => {
    navigate('/studentlogin');
  };

  const toTeacherLogin = () => {
    navigate('/teacherlogin')
  }

  return (
    <div className="container">
      <button className="teacher-button" onClick={toTeacherLogin}>Teacher</button>
      <div className="header">
        <h1 className="title">Let’s Practice!</h1>
        <div className="grade-buttons">
          <button className="grade-button" onClick={toStudentLogin}>Grade 3</button>
          <button className="grade-button" onClick={toStudentLogin}>Grade 4</button>
          <button className="grade-button" onClick={toStudentLogin}>Grade 5</button>
        </div>
        <div className="dog-section">
          <div className="speech-bubble">When you are ready, choose your grade!</div>
          <img src={dog_image} alt="dog" className="dog-image" />
        </div>
      </div>
      <div className="background-fish">
        <img src={fish_image} alt="Fish" className="fish" />
        <img src={fish_image} alt="Fish" className="fish" />
      </div>
    </div>
  );
};
