import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StudentAnswer.module.css";
import answerImage1 from "../../Assets/cat1.png";
import answerImage2 from "../../Assets/cat2.png";
import answerImage3 from "../../Assets/cat3.png";

export const StudentAnswer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location.state?.questions || [];
  const quizId = location.state?.quizId;
  const promptIndex = location.state?.promptIndex || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);  // Keep track of attempts

  const answerImages = [answerImage1, answerImage2, answerImage3]; // Array of answer images

  const currentQuestion = questions[currentQuestionIndex];

  // This function maps the answer options to the correct image
  const getAnswerImage = (optionNumber) => {
    return answerImages[optionNumber - 1]; // Adjust for zero-based index
  };

  // Function to check if the selected answer is correct
  const checkAnswer = (selectedOption) => {
    const correctAnswer = parseInt(currentQuestion.correct_answer, 10); 
    setSelectedAnswer(selectedOption);
  
    // Now, compare selectedOption with correctAnswer
    setIsAnswerCorrect(selectedOption === correctAnswer); // Compare numbers directly
  };

  const toNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null); 
      setIsAnswerCorrect(null); 
      setAttempts(0); 
    } else {
      navigate("/question", {
        state: { quizId, promptIndex: promptIndex + 1 },
      });
    }
  };

  const resetQuestion = () => {
    setSelectedAnswer(null); 
    setIsAnswerCorrect(null);
    setAttempts((prev) => prev + 1);  
  };

  useEffect(() => {
  }, [currentQuestionIndex]);

  return (
    <div className={styles.background}>
      <div className={styles.questionNumber}>
        Question {currentQuestionIndex + 1}
      </div>

      <div className={styles.questionContainer}>
        <h1 className={styles.question}>
          {currentQuestion?.question_text}
        </h1>
      </div>

      <div className={styles.answersContainer}>
        {/* Answer 1 */}
        <div
          className={`${styles.answerBox} ${
            selectedAnswer === 1 ? styles.selected : ""
          }`}
          onClick={() => checkAnswer(1)}
        >
          <img
            src={getAnswerImage(1)}
            alt="Answer 1"
            className={styles.answerImage}
          />
        </div>

        {/* Answer 2 */}
        <div
          className={`${styles.answerBox} ${
            selectedAnswer === 2 ? styles.selected : ""
          }`}
          onClick={() => checkAnswer(2)}
        >
          <img
            src={getAnswerImage(2)}
            alt="Answer 2"
            className={styles.answerImage}
          />
        </div>

        {/* Answer 3 */}
        <div
          className={`${styles.answerBox} ${
            selectedAnswer === 3 ? styles.selected : ""
          }`}
          onClick={() => checkAnswer(3)}
        >
          <img
            src={getAnswerImage(3)}
            alt="Answer 3"
            className={styles.answerImage}
          />
        </div>
      </div>

      {/* Feedback */}
      {isAnswerCorrect !== null && (
        <div className={styles.feedback}>
          {isAnswerCorrect ? (
            <span className={styles.correct}>Correct!</span>
          ) : (
            <span className={styles.incorrect}>Incorrect!</span>
          )}
        </div>
      )}

      {/* Retry Button */}
      {attempts < 2 && (
        <div className={styles.retryButton} onClick={resetQuestion}>
          Retry
        </div>
      )}

      {/* Next Question Button */}
      <div className={styles.nextButton} onClick={toNextQuestion}>
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
      </div>
    </div>
  );
};
