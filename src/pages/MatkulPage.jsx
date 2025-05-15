import React, { useState, useEffect } from 'react';
import MatkulForm from '../components/MatkulForm';
import MatkulTable from '../components/MatkulTable';
import { getAllMatkul, addMatkul, updateMatkul, deleteMatkul } from '../services/matkulService';

function MatkulPage() {
  const [matkulList, setMatkulList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMatkul, setEditingMatkul] = useState(null);

  // Fetch all courses on component mount
  useEffect(() => {
    fetchMatkul();
  }, []);

  const fetchMatkul = async () => {
    setIsLoading(true);
    try {
      const data = await getAllMatkul();
      setMatkulList(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch matkul data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMatkul = async (matkulData) => {
    try {
      await addMatkul(matkulData);
      fetchMatkul(); // Refresh the list
      setError(null);
    } catch (err) {
      setError("Failed to add matkul");
      console.error(err);
    }
  };

  const handleUpdateMatkul = async (kode, matkulData) => {
    try {
      await updateMatkul(kode, matkulData);
      fetchMatkul(); // Refresh the list
      setEditingMatkul(null); // Clear editing state
      setError(null);
    } catch (err) {
      setError("Failed to update matkul");
      console.error(err);
    }
  };

  const handleDeleteMatkul = async (kode) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteMatkul(kode);
        fetchMatkul(); // Refresh the list
        setError(null);
      } catch (err) {
        setError("Failed to delete matkul");
        console.error(err);
      }
    }
  };

  const startEditing = (matkul) => {
    setEditingMatkul(matkul);
  };

  const cancelEditing = () => {
    setEditingMatkul(null);
  };

  return (
    <div>
      <h1>Mata Kuliah Management</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {editingMatkul ? 'Edit Mata Kuliah' : 'Add Mata Kuliah'}
          </h2>
        </div>
        <MatkulForm 
          onSubmit={editingMatkul 
            ? (data) => handleUpdateMatkul(editingMatkul.kode, data) 
            : handleAddMatkul}
          initialData={editingMatkul}
          onCancel={cancelEditing}
        />
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Mata Kuliah List</h2>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <MatkulTable 
            matkulList={matkulList} 
            onEdit={startEditing}
            onDelete={handleDeleteMatkul}
          />
        )}
      </div>
    </div>
  );
}

export default MatkulPage;