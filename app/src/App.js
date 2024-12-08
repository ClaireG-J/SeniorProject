import logo from './logo.svg';
import './App.css';
import { HomePage } from './Components/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentLogin } from './Components/StudentLogin/StudentLogin';

function App() {
  return (
    <div>
      <StudentLogin/>
    </div>
  );
}

export default App;
