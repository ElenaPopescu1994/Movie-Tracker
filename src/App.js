import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const initialMovies = [
    { id: 1, title: "Inception", description: "A mind-bending thriller", year: 2010 },
    { id: 2, title: "The Matrix", description: "Sci-fi classic", year: 1999 }
  ];

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : initialMovies;
  });

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    setMovies(prev => [...prev, { ...movie, id: Date.now() }]);
  };

  const editMovie = (updatedMovie) => {
    setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m));
  };

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home movies={movies} onDelete={deleteMovie} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
