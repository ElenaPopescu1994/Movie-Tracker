const API_URL = 'http://localhost:5000';

export async function fetchMovies() {
  const res = await fetch(`${API_URL}/movies`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function deleteMovieById(id) {
  const res = await fetch(`${API_URL}/movies/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete movie');
  return true;
}

export async function fetchMovieById(id) {
  const res = await fetch(`${API_URL}/movies/${id}`);
  if (!res.ok) throw new Error('Movie not found');
  return res.json();
}

export async function addMovie(movie) {
  const res = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error('Failed to add movie');
  return res.json();
}

export async function updateMovie(movie) {
  const res = await fetch(`${API_URL}/movies/${movie.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error('Failed to update movie');
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('Login request failed');

  const users = await res.json();
  const user = users.find(u => u.password === password); 

  if (!user) throw new Error('Invalid email or password');

  return user;
}

export async function registerUser(userData) {
  const checkRes = await fetch(`${API_URL}/users?email=${encodeURIComponent(userData.email)}`);
  const existingUsers = await checkRes.json();
  if (existingUsers.length > 0) throw new Error('Email already registered');

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to register');
  return res.json();
}