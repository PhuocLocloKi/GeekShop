import api from './api';

export const reviewService = {
  getByProduct: (productId) =>
    api.get(`/reviews/${productId}`),

  create: (productId, rating, comment) =>
    api.post('/reviews', { productId, rating, comment }),

  delete: (id) =>
    api.delete(`/reviews/${id}`),
};

export default reviewService;
