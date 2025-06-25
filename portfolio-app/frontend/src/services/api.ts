import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Profile
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data: FormData) => api.post('/profile', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Experience
export const experienceAPI = {
  getAll: () => api.get('/experience'),
  getByType: (type: string) => api.get(`/experience/type/${type}`),
  create: (data: any) => api.post('/experience', data),
  update: (id: string, data: any) => api.put(`/experience/${id}`, data),
  delete: (id: string) => api.delete(`/experience/${id}`),
};

// Projects
export const projectsAPI = {
  getAll: (params?: any) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: FormData) => api.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id: string, data: FormData) => api.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Skills
export const skillsAPI = {
  getAll: () => api.get('/skills'),
  getByCategory: (category: string) => api.get(`/skills/category/${category}`),
  create: (data: any) => api.post('/skills', data),
  update: (id: string, data: any) => api.put(`/skills/${id}`, data),
  delete: (id: string) => api.delete(`/skills/${id}`),
};

export default api;