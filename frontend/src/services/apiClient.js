import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/';

let accessToken = null;

export const setAccessToken = (token) => { accessToken = token; };
export const getAccessToken = () => accessToken;
export const clearAccessToken = () => { accessToken = null; };

export const createAPIClient = (basePath, defaultHeaders = {}) => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}${basePath}`,
    withCredentials: true,
    headers: defaultHeaders,
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};
