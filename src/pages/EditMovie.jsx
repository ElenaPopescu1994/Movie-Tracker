import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMovie.css';

export default function EditMovie({ movies, setMovies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, [name]: value } : m
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Movie updated!');
    navigate('/');
  };

  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="edit-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
