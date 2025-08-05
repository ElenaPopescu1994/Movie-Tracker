import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = (credentials) => api.post('/login', credentials);
export const registerUser = (userData) => api.post('/register', userData);
export const getBabies = () => api.get('/babies');
export const addBaby = (babyData) => api.post('/babies', babyData);
export const updateBaby = (id, babyData) => api.put(`/babies/${id}`, babyData);
export const deleteBaby = (id) => api.delete(`/babies/${id}`);

export default api;
