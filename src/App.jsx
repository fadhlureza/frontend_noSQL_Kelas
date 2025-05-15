import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MahasiswaPage from './pages/MahasiswaPage';
import MatkulPage from './pages/MatkulPage';
import EnrollmentPage from './pages/EnrollmentPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">Student Management System</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/mahasiswa">Mahasiswa</Link>
            </li>
            <li>
              <Link to="/matkul">Mata Kuliah</Link>
            </li>
            <li>
              <Link to="/enrollment">Enrollment</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mahasiswa" element={<MahasiswaPage />} />
            <Route path="/matkul" element={<MatkulPage />} />
            <Route path="/enrollment" element={<EnrollmentPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 Student Management System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;