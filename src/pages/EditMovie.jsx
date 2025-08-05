import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMovie.css';

export default function EditMovie({ movies, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movieToEdit = movies.find(m => m.id === Number(id));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: ''
  });

  useEffect(() => {
    if (movieToEdit) {
      setFormData({
        title: movieToEdit.title,
        description: movieToEdit.description,
        year: movieToEdit.year || ''
      });
    }
  }, [movieToEdit]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = {
      id: movieToEdit.id,
      ...formData,
      year: Number(formData.year)
    };

    onEdit(updatedMovie); 
    navigate('/');         
  };

  if (!movieToEdit) {
    return <p>Movie not found!</p>;
  }

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} className="edit-movie-form">
        <div>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div>
          <label>Year</label>
          <input
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
