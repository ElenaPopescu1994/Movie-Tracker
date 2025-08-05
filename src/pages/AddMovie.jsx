import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

export default function AddMovie({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.year || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    onAdd({
      title: formData.title,
      year: formData.year,
      description: formData.description
    });

    alert('Movie added successfully!');
    navigate('/');
  };

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            type="number"
            min="1888"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}
