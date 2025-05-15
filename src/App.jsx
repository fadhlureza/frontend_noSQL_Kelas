import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MahasiswaPage from './pages/MahasiswaPage';
import MatkulPage from './pages/MatkulPage';
import EnrollmentPage from './pages/EnrollmentPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Student Enrollment System</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/mahasiswa" className="hover:underline">Students</Link>
              <Link to="/matkul" className="hover:underline">Courses</Link>
              <Link to="/enrollment" className="hover:underline">Enrollments</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mahasiswa" element={<MahasiswaPage />} />
            <Route path="/matkul" element={<MatkulPage />} />
            <Route path="/enrollment" element={<EnrollmentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-8">Welcome to Student Enrollment System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/mahasiswa" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
          <p className="text-gray-600">Add, update, and manage student information</p>
        </Link>
        <Link to="/matkul" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Courses</h2>
          <p className="text-gray-600">Add, update, and manage course information</p>
        </Link>
        <Link to="/enrollment" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Enrollments</h2>
          <p className="text-gray-600">Enroll students in courses and manage enrollments</p>
        </Link>
      </div>
    </div>
  );
}

export default App;