import api from './api';

export const geminiService = {
  sendChat: (messages) =>
    api.post('/chat', { messages }),
};

export default geminiService;
