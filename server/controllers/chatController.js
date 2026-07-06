const geminiService = require('../services/geminiService');

const chatController = {
  sendMessage: async (req, res, next) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: 'Messages array is required.' });
      }

      const reply = await geminiService.chat(messages);
      res.status(200).json({ reply });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = chatController;
