import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ movies }) {
  return (
    <div className="home-container">
      <h2>Movie List</h2>
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <Link to={`/edit/${movie.id}`} className="edit-link">Edit</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
