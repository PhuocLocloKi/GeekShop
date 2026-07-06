import api from './api';

export const orderService = {
  create: (orderData) =>
    api.post('/orders', orderData),

  getMyOrders: () =>
    api.get('/orders'),

  getOrderById: (id) =>
    api.get(`/orders/${id}`),

  // Admin
  getAllOrders: (params = {}) =>
    api.get('/admin/orders', { params }),

  updateStatus: (id, status) =>
    api.put(`/orders/${id}/status`, { status }),
};

export default orderService;
