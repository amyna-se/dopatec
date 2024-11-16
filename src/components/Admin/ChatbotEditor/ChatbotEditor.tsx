import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, Save, Trash } from 'lucide-react';
import { useChatbot, ChatProvider } from '../../../stores/modules/chatbot';
import { ChatSession } from './ChatSession';
import toast from 'react-hot-toast';

const PROVIDERS: { id: ChatProvider; name: string }[] = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'mistral', name: 'Mistral AI' },
  { id: 'google', name: 'Google AI' },
  { id: 'azure', name: 'Azure OpenAI' }
];

type EditorTab = 'chat' | 'settings';

export function ChatbotEditor() {
  const { settings, updateSettings } = useChatbot();
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState<EditorTab>('chat');

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Chatbot settings updated successfully');
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">Chatbot</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'chat'
                ? 'bg-neon-purple text-white'
                : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'settings'
                ? 'bg-neon-purple text-white'
                : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <ChatSession />
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Provider
            </label>
            <select
              value={localSettings.provider}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                provider: e.target.value as ChatProvider
              })}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
            >
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={localSettings.apiKey || ''}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                apiKey: e.target.value
              })}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
              placeholder="Enter API key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Model
            </label>
            <input
              type="text"
              value={localSettings.model}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                model: e.target.value
              })}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Temperature ({localSettings.temperature})
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={localSettings.temperature}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                temperature: parseFloat(e.target.value)
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Max Tokens
            </label>
            <input
              type="number"
              value={localSettings.maxTokens}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                maxTokens: parseInt(e.target.value)
              })}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              System Prompt
            </label>
            <textarea
              value={localSettings.systemPrompt}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                systemPrompt: e.target.value
              })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}