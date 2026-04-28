import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const sendMessage = useCallback(async (message: string) => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      const assistantMessage: ChatMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);

      return data.response;
    } catch (error) {
      console.error('Chatbot error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token, messages]);

  const loadHistory = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/chatbot', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(data.history);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }, [token]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    loadHistory,
    clearMessages,
  };
}
