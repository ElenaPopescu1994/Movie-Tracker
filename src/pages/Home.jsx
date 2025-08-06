import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchMovies, deleteMovieById } from '../services/api';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch(() => setError('Failed to load movies. Please try again.'));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;

    setDeletingId(id);
    deleteMovieById(id)
      .then(() => {
        setMovies(m => m.filter(movie => movie.id !== id));
        setDeletingId(null);
      })
      .catch(() => {
        alert('Failed to delete movie. Please try again.');
        setDeletingId(null);
      });
  };

  return (
    <div className="home-container">
      {error && <p className="error">{error}</p>}
      {movies.length === 0 && !error && <p>No movies found.</p>}
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h3>{movie.title} ({movie.year})</h3>
          <p>{movie.description}</p>
          <div className="actions">
            {user && <Link className="edit-link" to={`/edit/${movie.id}`}>Edit</Link>}
            {user && (
              <button
                className="delete-button"
                onClick={() => handleDelete(movie.id)}
                disabled={deletingId === movie.id}
              >
                {deletingId === movie.id ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
