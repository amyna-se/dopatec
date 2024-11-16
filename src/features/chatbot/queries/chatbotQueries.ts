import { ChatMessage, ChatProvider } from '../../../stores/modules/chatbot';

export const chatbotQueries = {
  getModels: async (provider: ChatProvider): Promise<string[]> => {
    try {
      const response = await fetch(`/api/chatbot/${provider}/models`);
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getConversationHistory: async (sessionId: string): Promise<ChatMessage[]> => {
    try {
      const response = await fetch(`/api/chatbot/sessions/${sessionId}/history`);
      if (!response.ok) {
        throw new Error('Failed to fetch conversation history');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getProviderStatus: async (provider: ChatProvider): Promise<{
    available: boolean;
    latency: number;
  }> => {
    try {
      const response = await fetch(`/api/chatbot/${provider}/status`);
      if (!response.ok) {
        throw new Error('Failed to fetch provider status');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};