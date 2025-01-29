import React from "react";
import styles from "./StudentScore.module.css";
import { useNavigate } from "react-router-dom";

export const StudentScore = () => {
  const navigate = useNavigate();

  const toDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.button} onClick={toDashboard}>
        Grade 3
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Question 1</th>
              <th>Question 2</th>
              <th>Question 3</th>
              <th>Question 4</th>
              <th>Question 5</th>
              <th>Overall Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>4</td>
              <td>3</td>
              <td>1</td>
              <td>5</td>
              <td>10</td>
              <td>30</td>
            </tr>
            {Array(15)
              .fill(null)
              .map((_, index) => (
                <tr key={index}>
                  <td>John Doe</td>
                  <td>4</td>
                  <td>3</td>
                  <td>1</td>
                  <td>5</td>
                  <td>10</td>
                  <td>30</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
