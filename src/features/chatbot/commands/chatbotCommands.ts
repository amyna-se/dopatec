import { ChatProvider, ChatMessage } from '../../../stores/modules/chatbot';

interface SendMessageCommand {
  provider: ChatProvider;
  message: string;
  sessionId: string;
  settings: {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt?: string;
  };
}

interface UpdateSettingsCommand {
  provider: ChatProvider;
  settings: {
    apiKey?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  };
}

export const chatbotCommands = {
  sendMessage: async (command: SendMessageCommand): Promise<ChatMessage> => {
    try {
      const response = await fetch('/api/chatbot/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateSettings: async (command: UpdateSettingsCommand): Promise<void> => {
    try {
      const response = await fetch(`/api/chatbot/${command.provider}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command.settings)
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      throw error;
    }
  },

  clearHistory: async (sessionId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/chatbot/sessions/${sessionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to clear history');
      }
    } catch (error) {
      throw error;
    }
  }
};