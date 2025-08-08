import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchMovieById } from '../services/api';
import './MovieDetails.css';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieById(id)
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Movie not found.');
        setLoading(false);
        setTimeout(() => navigate('/'), 3000);
      });
  }, [id, navigate]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-details-wrapper">
      <div className="movie-details-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/${movie.poster || 'default.jpg'}`}
          alt={movie.title}
          className="movie-details-poster"
        />
        <div className="movie-details-text">
          <h2>{movie.title} ({movie.year})</h2>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
