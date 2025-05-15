import React, { useState, useEffect } from 'react';
import { getAllMahasiswa } from '../services/mahasiswaService';
import { getAllMatkul } from '../services/matkulService';
import { getAllEnrollments } from '../services/enrollmentService';

function Dashboard() {
  const [stats, setStats] = useState({
    mahasiswaCount: 0,
    matkulCount: 0,
    enrollmentCount: 0,
    averageIpk: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [mahasiswa, matkul, enrollments] = await Promise.all([
        getAllMahasiswa(),
        getAllMatkul(),
        getAllEnrollments()
      ]);
      
      // Calculate average IPK
      const totalIpk = mahasiswa.reduce((sum, student) => sum + student.IPK, 0);
      const averageIpk = mahasiswa.length > 0 ? totalIpk / mahasiswa.length : 0;
      
      setStats({
        mahasiswaCount: mahasiswa.length,
        matkulCount: matkul.length,
        enrollmentCount: enrollments.length,
        averageIpk: averageIpk.toFixed(2)
      });
      
      setError(null);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {isLoading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Students</h2>
            </div>
            <div className="card-content">
              <div className="stat-number">{stats.mahasiswaCount}</div>
              <p>Total Registered Students</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Courses</h2>
            </div>
            <div className="card-content">
              <div className="stat-number">{stats.matkulCount}</div>
              <p>Available Courses</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Enrollments</h2>
            </div>
            <div className="card-content">
              <div className="stat-number">{stats.enrollmentCount}</div>
              <p>Active Enrollments</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Average IPK</h2>
            </div>
            <div className="card-content">
              <div className="stat-number">{stats.averageIpk}</div>
              <p>Average Student IPK</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;