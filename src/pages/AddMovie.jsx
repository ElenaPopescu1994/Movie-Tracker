import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../services/api';
import './AddMovie.css';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];

export default function AddMovie() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genre: genres[0],
    actors: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie({
        ...formData,
        year: Number(formData.year),
        poster: 'default.jpg'
      });
      alert('Movie added!');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Year</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <label>Actors</label>
        <input name="actors" value={formData.actors} onChange={handleChange} placeholder="Actor1, Actor2, ..." />

        <label>Genre</label>
        <select name="genre" value={formData.genre} onChange={handleChange}>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}
