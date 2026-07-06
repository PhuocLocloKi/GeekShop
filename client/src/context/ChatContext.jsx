import { createContext, useContext, useState, useCallback } from 'react';
import geminiService from '../services/gemini';

const ChatContext = createContext(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to GeekShop! I\'m your AI hardware expert. Ask me about any of our products, get recommendations, or compare items. How can I help you today?',
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    setError(null);
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const allMessages = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      const res = await geminiService.sendChat(allMessages);
      const assistantMessage = {
        role: 'assistant',
        content: res.data.reply || res.data.message || 'I apologize, I couldn\'t process that request.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError('Connection lost. Please try again.');
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I\'m having trouble connecting right now. Please try again in a moment, or browse our product catalog directly.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const clearHistory = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat cleared. How can I help you today?',
      },
    ]);
    setError(null);
  }, []);

  const value = {
    messages,
    isOpen,
    isTyping,
    error,
    toggleChat,
    sendMessage,
    clearHistory,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
