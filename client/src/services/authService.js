import api from './api';

export const authService = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getProfile: () =>
    api.get('/auth/profile'),

  updateProfile: (data) =>
    api.put('/auth/profile', data),

  changePassword: (currentPassword, newPassword) =>
    api.put('/auth/password', { currentPassword, newPassword }),

  // OAuth URLs (redirect-based)
  getGoogleAuthUrl: () => `${api.defaults.baseURL}/auth/google`,
  getFacebookAuthUrl: () => `${api.defaults.baseURL}/auth/facebook`,
};

export default authService;
