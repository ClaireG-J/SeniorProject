import React, { useEffect, useState } from "react";
import styles from "./StudentScore.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export const StudentScore = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [scores, setScores] = useState([]);

  const teacherCode = location.state?.teacherCode || '';
  const grade = location.state?.grade || 3;
  console.log(teacherCode);

  useEffect(() => {
    if (!teacherCode) {
      console.warn("No teacher code provided");
      return;
    }

    const fetchScores = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/scores/${teacherCode}/?grade=${grade}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error("Failed to fetch scores");

        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [teacherCode]);

  const toDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.pageWrapper}>
      <button className={styles.button} onClick={toDashboard}>
        Back to Dashboard
      </button>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Overall Grade</th>
            </tr>
          </thead>
          <tbody>
            {scores.length === 0 ? (
              <tr>
                <td colSpan="2" className={styles.noScores}>No scores available</td>
              </tr>
            ) : (
              scores.map((student, index) => (
                <tr key={index}>
                  <td>{student.student_username || 'Unnamed'}</td>
                  <td>{student.score ?? 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
