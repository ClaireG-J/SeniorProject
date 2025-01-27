import './App.css';
import { HomePage } from './Components/pages/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { StudentLogin } from './Components/pages/StudentLogin/StudentLogin';
import { TeacherLogin } from './Components/pages/TeacherLogin/TeacherLogin';
import { TeacherSignup } from './Components/pages/TeacherSignup/TeacherSignup';
import { StudentAnswer } from './Components/pages/StudentQuiz/StudentAnswer';
import { TeacherDashboard } from './Components/pages/TeacherDashboard/TeacherDashboard';
import { StudentQuestion } from './Components/pages/StudentQuiz/StudentQuestion';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studentlogin" element={<StudentLogin/>} />
        <Route path="/teacherlogin" element={<TeacherLogin/>} />
        <Route path="/signup" element={<TeacherSignup/>} />
        <Route path="/answer" element={<StudentAnswer/>} />
        <Route path="/question" element={<StudentQuestion/>} />
        <Route path="/dashboard" element={<TeacherDashboard/>} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);