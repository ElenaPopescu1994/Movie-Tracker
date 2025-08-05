import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Movie Tracker</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Movie</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
