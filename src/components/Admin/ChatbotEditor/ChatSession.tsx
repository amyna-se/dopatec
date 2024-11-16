import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash, Plus } from 'lucide-react';
import { useChatbot, ChatMessage } from '../../../stores/modules/chatbot';
import { chatbotCommands } from '../../../features/chatbot/commands/chatbotCommands';

export function ChatSession() {
  const {
    sessions,
    activeSessionId,
    createSession,
    addMessage,
    deleteSession,
    setActiveSession,
    settings
  } = useChatbot();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeSessionId && Object.keys(sessions).length === 0) {
      createSession();
    }
  }, [activeSessionId, sessions, createSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId]);

  const handleSend = async () => {
    if (!activeSessionId || !input.trim()) return;

    setIsLoading(true);
    const userMessage: Omit<ChatMessage, 'id' | 'timestamp'> = {
      role: 'user',
      content: input
    };

    addMessage(activeSessionId, userMessage);
    setInput('');

    try {
      const response = await chatbotCommands.sendMessage({
        provider: settings.provider,
        message: input,
        sessionId: activeSessionId,
        settings: {
          model: settings.model,
          temperature: settings.temperature,
          maxTokens: settings.maxTokens,
          systemPrompt: settings.systemPrompt
        }
      });

      addMessage(activeSessionId, {
        role: 'assistant',
        content: response.content
      });
    } catch (error) {
      addMessage(activeSessionId, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[600px]">
      {/* Sessions Sidebar */}
      <div className="w-64 bg-dark border-r border-gray-700 p-4">
        <button
          onClick={() => createSession()}
          className="w-full px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center justify-center space-x-2 mb-4"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        <div className="space-y-2">
          {Object.values(sessions).map((session) => (
            <div
              key={session.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                session.id === activeSessionId
                  ? 'bg-neon-purple/20 text-neon-purple'
                  : 'hover:bg-gray-700/50 text-gray-400'
              }`}
              onClick={() => setActiveSession(session.id)}
            >
              <span className="truncate">{session.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className="p-1 rounded hover:bg-gray-600 transition"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeSessionId &&
            sessions[activeSessionId]?.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'assistant'
                      ? 'bg-gray-700 text-white'
                      : 'bg-neon-purple/20 text-neon-purple'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}