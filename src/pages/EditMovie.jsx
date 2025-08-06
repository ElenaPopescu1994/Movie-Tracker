import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieById, updateMovie } from '../services/api';
import './EditMovie.css';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieById(id)
      .then(movie => {
        if (!movie.genre) movie.genre = genres[0];
        setFormData(movie);
        setLoading(false);
      })
      .catch(err => {
        setError('Movie not found or failed to load.');
        setLoading(false);
        setTimeout(() => navigate('/'), 3000);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await updateMovie({
        ...formData,
        year: Number(formData.year),
      });
      alert('Movie updated!');
      navigate('/');
    } catch (err) {
      setError('Failed to update movie. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      {error && <div className="error-message">{error}</div>}
      {formData && (
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Year</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required />

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

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}
