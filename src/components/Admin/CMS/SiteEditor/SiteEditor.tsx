import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, Type } from 'lucide-react';
import { useSiteSettings } from '../../../../stores/modules/siteSettings';
import { ThemeEditor } from './ThemeEditor';
import { ContentEditor } from './ContentEditor';

type EditorTab = 'theme' | 'content';

export default function SiteEditor() {
  const [activeTab, setActiveTab] = useState<EditorTab>('content');
  const { resetToDefaults } = useSiteSettings();

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Site Editor</h2>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition ${
            activeTab === 'content'
              ? 'bg-neon-purple text-white'
              : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Content</span>
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition ${
            activeTab === 'theme'
              ? 'bg-neon-purple text-white'
              : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Theme</span>
        </button>
      </div>

      <div className="bg-dark rounded-lg p-4">
        {activeTab === 'theme' ? <ThemeEditor /> : <ContentEditor />}
      </div>
    </div>
  );
}