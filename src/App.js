import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", description: "A mind-bending thriller" },
    { id: 2, title: "The Matrix", description: "Sci-fi classic" }
  ]);

  const addMovie = (movie) => {
    setMovies(prev => [...prev, { ...movie, id: Date.now() }]);
  };

  const editMovie = (updatedMovie) => {
    setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m));
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/add" element={<AddMovie onAdd={addMovie} />} />
          <Route path="/edit/:id" element={<EditMovie movies={movies} onEdit={editMovie} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
