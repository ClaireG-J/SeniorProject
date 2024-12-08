// import logo from './logo.svg';
import './App.css';
import { HomePage } from './Components/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { StudentLogin } from './Components/StudentLogin/StudentLogin';
import Layout from "./Components/Layout";

export default function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="studentlogin" element={<StudentLogin />} />
        </Route>
      </Routes>
      </Router>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
