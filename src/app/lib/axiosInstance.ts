import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://book-store-api-4mpr.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
