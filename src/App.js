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

const API_URL = 'http://localhost:5000';

function App() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to fetch movies:', err));
  }, []);

  const addMovie = async (movie) => {
    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });
      if (!res.ok) throw new Error('Failed to add movie');
      const newMovie = await res.json();
      setMovies(prev => [...prev, newMovie]);
    } catch (error) {
      console.error(error);
    }
  };

  const editMovie = async (updatedMovie) => {
    try {
      const res = await fetch(`${API_URL}/movies/${updatedMovie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMovie),
      });
      if (!res.ok) throw new Error('Failed to update movie');
      const data = await res.json();
      setMovies(prev => prev.map(m => (m.id === data.id ? data : m)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const res = await fetch(`${API_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete movie');
      setMovies(prev => prev.filter(m => m.id !== id));
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
