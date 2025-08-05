import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

function Home({ movies, onDelete }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h3 className="movie-title">{movie.title} ({movie.year})</h3>
          <p className="movie-description">{movie.description}</p>
          <div className="actions">
            {user && (
              <>
                <Link className="edit-link" to={`/edit/${movie.id}`}>Edit</Link>
                <button className="delete-button" onClick={() => onDelete(movie.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
