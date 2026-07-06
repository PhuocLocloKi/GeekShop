import api from './api';

export const cartService = {
  getCart: () =>
    api.get('/cart'),

  addItem: (productId, quantity = 1) =>
    api.post('/cart', { productId, quantity }),

  updateItem: (id, quantity) =>
    api.put(`/cart/${id}`, { quantity }),

  removeItem: (id) =>
    api.delete(`/cart/${id}`),

  syncCart: (localItems) =>
    api.post('/cart/sync', { items: localItems }),

  clearCart: () =>
    api.delete('/cart'),
};

export default cartService;
