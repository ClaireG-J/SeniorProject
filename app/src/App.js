import './App.css';
import { HomePage } from './Components/pages/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { StudentLogin } from './Components/pages/StudentLogin/StudentLogin';
import { TeacherLoginSignup } from './Components/pages/TeacherLoginSignup/TeacherLoginSignup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/teacherloginsignup" element={<TeacherLoginSignup />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
