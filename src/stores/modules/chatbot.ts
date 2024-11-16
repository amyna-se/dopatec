import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ChatProvider = 'openai' | 'anthropic' | 'mistral' | 'google' | 'azure';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatbotSettings {
  provider: ChatProvider;
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey?: string;
  systemPrompt: string;
}

interface ChatbotState {
  sessions: Record<string, ChatSession>;
  settings: ChatbotSettings;
  activeSessionId: string | null;
  addMessage: (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  createSession: () => string;
  deleteSession: (sessionId: string) => void;
  updateSettings: (settings: Partial<ChatbotSettings>) => void;
  setActiveSession: (sessionId: string) => void;
}

const defaultSettings: ChatbotSettings = {
  provider: 'openai',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt: 'You are a helpful AI assistant for NeuroStep, an educational platform focused on neurodiversity.'
};

export const useChatbot = create<ChatbotState>()(
  persist(
    (set, get) => ({
      sessions: {},
      settings: defaultSettings,
      activeSessionId: null,

      addMessage: (sessionId, message) => set((state) => {
        const session = state.sessions[sessionId];
        if (!session) return state;

        const newMessage = {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: new Date().toISOString()
        };

        return {
          sessions: {
            ...state.sessions,
            [sessionId]: {
              ...session,
              messages: [...session.messages, newMessage],
              updatedAt: new Date().toISOString()
            }
          }
        };
      }),

      createSession: () => {
        const sessionId = `session-${Date.now()}`;
        set((state) => ({
          sessions: {
            ...state.sessions,
            [sessionId]: {
              id: sessionId,
              title: 'New Chat',
              messages: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          },
          activeSessionId: sessionId
        }));
        return sessionId;
      },

      deleteSession: (sessionId) => set((state) => {
        const { [sessionId]: _, ...restSessions } = state.sessions;
        return {
          sessions: restSessions,
          activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId
        };
      }),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      setActiveSession: (sessionId) => set({ activeSessionId: sessionId })
    }),
    {
      name: 'chatbot-storage'
    }
  )
);