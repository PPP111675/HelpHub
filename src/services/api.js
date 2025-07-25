import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'https://helphub-10.onrender.com/api';

const instance = axios.create({ baseURL: API_BASE });

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`; // ✅ this must be set
  return config;
});


export default instance;
