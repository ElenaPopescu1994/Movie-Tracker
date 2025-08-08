import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import MovieDetails from './pages/MovieDetails';
import Pagination from './components/Pagination';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import { fetchMovies, addMovie as apiAddMovie, updateMovie as apiUpdateMovie, deleteMovieById } from './services/api';

const itemsPerPage = 12;

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      try {
        const { movies, totalCount } = await fetchMovies(currentPage, itemsPerPage);
        setMovies(movies);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }
    loadMovies();
  }, [currentPage]);

  const addMovie = async (movie) => {
    try {
      const newMovie = await apiAddMovie(movie);
      if (currentPage === totalPages) {
        setMovies(prev => [...prev, newMovie]);
      } else {
        setCurrentPage(totalPages); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editMovie = async (updatedMovie) => {
    try {
      const data = await apiUpdateMovie(updatedMovie);
      setMovies(prev => prev.map(m => (m.id === data.id ? data : m)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await deleteMovieById(id);
      if (movies.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        const { movies: updatedMovies, totalCount } = await fetchMovies(currentPage, itemsPerPage);
        setMovies(updatedMovies);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home movies={movies} onDelete={deleteMovie} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddMovie onAdd={addMovie} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditMovie movies={movies} onEdit={editMovie} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
