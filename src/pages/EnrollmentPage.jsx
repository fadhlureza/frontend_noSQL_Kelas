import React, { useState, useEffect } from 'react';
import EnrollmentForm from '../components/EnrollmentForm';
import EnrollmentTable from '../components/EnrollmentTable';
import { 
  getAllEnrollments, 
  addEnrollment, 
  updateEnrollment, 
  deleteEnrollment 
} from '../services/enrollmentService';
import { getAllMahasiswa } from '../services/mahasiswaService';
import { getAllMatkul } from '../services/matkulService';

function EnrollmentPage() {
  const [enrollmentList, setEnrollmentList] = useState([]);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [matkulList, setMatkulList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  // Fetch all enrollments and related data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [enrollments, mahasiswa, matkul] = await Promise.all([
        getAllEnrollments(),
        getAllMahasiswa(),
        getAllMatkul()
      ]);
      setEnrollmentList(enrollments);
      setMahasiswaList(mahasiswa);
      setMatkulList(matkul);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEnrollment = async (enrollmentData) => {
    try {
      await addEnrollment(enrollmentData);
      fetchAllData(); // Refresh the list
      setError(null);
    } catch (err) {
      setError("Failed to add enrollment");
      console.error(err);
    }
  };

  const handleUpdateEnrollment = async (id, enrollmentData) => {
    try {
      await updateEnrollment(id, enrollmentData);
      fetchAllData(); // Refresh the list
      setEditingEnrollment(null); // Clear editing state
      setError(null);
    } catch (err) {
      setError("Failed to update enrollment");
      console.error(err);
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        await deleteEnrollment(id);
        fetchAllData(); // Refresh the list
        setError(null);
      } catch (err) {
        setError("Failed to delete enrollment");
        console.error(err);
      }
    }
  };

  const startEditing = (enrollment) => {
    setEditingEnrollment(enrollment);
  };

  const cancelEditing = () => {
    setEditingEnrollment(null);
  };

  return (
    <div>
      <h1>Enrollment Management</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {editingEnrollment ? 'Edit Enrollment' : 'Add Enrollment'}
          </h2>
        </div>
        <EnrollmentForm 
          onSubmit={editingEnrollment 
            ? (data) => handleUpdateEnrollment(editingEnrollment._id, data) 
            : handleAddEnrollment}
          initialData={editingEnrollment}
          mahasiswaList={mahasiswaList}
          matkulList={matkulList}
          onCancel={cancelEditing}
        />
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Enrollment List</h2>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <EnrollmentTable 
            enrollmentList={enrollmentList} 
            mahasiswaList={mahasiswaList}
            matkulList={matkulList}
            onEdit={startEditing}
            onDelete={handleDeleteEnrollment}
          />
        )}
      </div>
    </div>
  );
}

export default EnrollmentPage;