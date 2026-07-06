import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Cpu } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { CHAT_SUGGESTIONS } from '../../utils/constants';

const ChatBot = () => {
  const { messages, isOpen, isTyping, error, toggleChat, sendMessage, clearHistory } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 'var(--z-dropdown)' }}>
      {/* Pulse Glowing Toggle button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '2px solid var(--neon-green)',
            color: 'var(--neon-green)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-green-intense)',
            animation: 'pulseGlow 2s infinite',
            transition: 'transform var(--transition-base)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Floating Chat window panel */}
      {isOpen && (
        <div
          className="glass-card-static"
          style={{
            width: '380px',
            height: '500px',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: 'var(--glow-cyan-intense)',
            animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={16} style={{ color: 'var(--neon-cyan)' }} />
              <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                AI_ASSISTANT
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={clearHistory}
                style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-pink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                title="Clear conversation log"
              >
                <Trash2 size={14} />
              </button>
              <button
                onClick={toggleChat}
                style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-pink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Conversation history area */}
          <div
            style={{
              flexGrow: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'rgba(9, 10, 15, 0.4)',
            }}
          >
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  style={{
                    alignSelf: isAssistant ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid',
                    borderColor: isAssistant ? 'rgba(6, 182, 212, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    background: isAssistant ? 'rgba(6, 182, 212, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                    color: isAssistant ? 'var(--text-primary)' : 'var(--text-primary)',
                    fontFamily: isAssistant ? 'var(--font-code)' : 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    lineHeight: 1.5,
                  }}
                >
                  {isAssistant && idx === messages.length - 1 ? (
                    <span className="typewriter-text" style={{ borderRight: 'none', whiteSpace: 'normal', display: 'inline' }}>
                      {msg.content}
                    </span>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              );
            })}

            {/* Bouncing dots typing indicator */}
            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '6px', height: '6px', background: 'var(--neon-cyan)', borderRadius: '50%', animation: 'bounceDot 1.4s infinite 0s' }} />
                <div style={{ width: '6px', height: '6px', background: 'var(--neon-cyan)', borderRadius: '50%', animation: 'bounceDot 1.4s infinite 0.2s' }} />
                <div style={{ width: '6px', height: '6px', background: 'var(--neon-cyan)', borderRadius: '50%', animation: 'bounceDot 1.4s infinite 0.4s' }} />
              </div>
            )}

            {/* Error notifications */}
            {error && (
              <div
                style={{
                  alignSelf: 'center',
                  background: 'rgba(244, 114, 182, 0.1)',
                  border: '1px solid var(--neon-pink)',
                  borderRadius: 'var(--radius-md)',
                  padding: '6px 12px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '9px',
                  color: 'var(--neon-pink)',
                }}
              >
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions chips */}
          {messages.length === 1 && (
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '10px 12px',
                overflowX: 'auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                background: 'rgba(9, 10, 15, 0.2)',
              }}
            >
              {CHAT_SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '6px 10px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '9px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    color: 'var(--neon-cyan)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* User Input form field */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '12px',
              borderTop: '1px solid var(--glass-border)',
              display: 'flex',
              gap: 'var(--space-sm)',
              background: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message..."
              className="cyber-input"
              style={{ padding: '8px 12px', fontSize: 'var(--text-xs)' }}
            />
            <button
              type="submit"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid var(--neon-green)',
                color: 'var(--neon-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--neon-green)';
                e.currentTarget.style.color = 'var(--bg-void)';
                e.currentTarget.style.boxShadow = 'var(--glow-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.color = 'var(--neon-green)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
