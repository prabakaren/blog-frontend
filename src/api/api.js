import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Send the logged in user's Firebase token with every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Pull a readable message out of an axios error
export function getErrorMessage(err, fallback = 'Something went wrong') {
  return err?.response?.data?.message || fallback;
}

export default api;
