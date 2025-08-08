import { useState } from "react";
import { fetchMovies } from "./services/api";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="movie-list">
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`./posters/${movie.poster}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.year} • {movie.genre}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-btn"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
