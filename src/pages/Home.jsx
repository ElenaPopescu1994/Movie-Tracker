import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { deleteMovieById } from '../services/api';
import Modal from '../components/Modal';
import './Home.css';

function Home({ movies, onDelete }) {
  const { user } = useContext(AuthContext);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const confirmDelete = () => {
    if (!movieToDelete) return;

    setDeletingId(movieToDelete.id);
    deleteMovieById(movieToDelete.id)
      .then(() => {
        onDelete(movieToDelete.id);
        setMovieToDelete(null);
        setDeletingId(null);
      })
      .catch(() => {
        alert('Failed to delete movie. Please try again.');
        setDeletingId(null);
      });
  };

  const cancelDelete = () => setMovieToDelete(null);

  const truncateText = (text, maxLength = 50) =>
    !text ? '' : text.length <= maxLength ? text : text.slice(0, maxLength) + '...';

  return (
    <div className="home-container">
      {movies.length === 0 && <p>No movies found.</p>}

      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`${process.env.PUBLIC_URL}/images/${movie.poster || 'default.jpg'}`}
            alt={movie.title}
            className="movie-poster"
          />
          <h3>{movie.title} ({movie.year})</h3>
          <p>
            {truncateText(movie.description)}{' '}
            {movie.description && movie.description.length > 50 && (
              <Link to={`/movies/${movie.id}`} className="read-more">Read more</Link>
            )}
          </p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <div className="actions">
            {user && <Link className="edit-link" to={`/edit/${movie.id}`}>Edit</Link>}
            {user && (
              <button
                className="delete-button"
                onClick={() => setMovieToDelete(movie)}
                disabled={deletingId === movie.id}
              >
                {deletingId === movie.id ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      ))}

      <Modal
        show={!!movieToDelete}
        title="Confirm delete"
        message={`Are you sure you want to delete "${movieToDelete?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default Home;
