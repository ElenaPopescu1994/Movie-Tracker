import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../services/api';
import './AddMovie.css';

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
  "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
];

export default function AddMovie() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genre: [],  
    actors: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, genre: [...prev.genre, value] };
      } else {
        return { ...prev, genre: prev.genre.filter(g => g !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.genre.length === 0) {
      alert('Please select at least one genre');
      return;
    }

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
        <input
          name="actors"
          value={formData.actors}
          onChange={handleChange}
          placeholder="Actor1, Actor2, ..."
        />

        <label>Genre</label>
        <div className="genre-checkboxes">
          {genres.map(g => (
            <label key={g} style={{ marginRight: '10px', display: 'inline-block' }}>
              <input
                type="checkbox"
                name="genre"
                value={g}
                checked={formData.genre.includes(g)}
                onChange={handleGenreChange}
              />
              {g}
            </label>
          ))}
        </div>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}
