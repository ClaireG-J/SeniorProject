import './App.css';
import { HomePage } from './Components/pages/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { StudentLogin } from './Components/pages/StudentLogin/StudentLogin';
import { TeacherLogin } from './Components/pages/TeacherLogin/TeacherLogin';
import { TeacherSignup } from './Components/pages/TeacherSignup/TeacherSignup';
import { StudentQuiz } from './Components/pages/StudentQuiz/StudentQuiz';
import { ScoreReport } from './Components/pages/ScoreReport/ScoreReport';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studentlogin" element={<StudentLogin/>} />
        <Route path="/teacherlogin" element={<TeacherLogin/>} />
        <Route path="/signup" element={<TeacherSignup/>} />
        <Route path="/questions" element={<StudentQuiz/>} />
        <Route path="/scorereport" element={<ScoreReport/>} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);