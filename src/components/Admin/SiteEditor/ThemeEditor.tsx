import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { useSiteSettings } from '../../../stores/modules/siteSettings';
import toast from 'react-hot-toast';

export function ThemeEditor() {
  const { theme, updateTheme } = useSiteSettings();
  const [localTheme, setLocalTheme] = useState(theme);

  const handleSave = () => {
    updateTheme(localTheme);
    toast.success('Theme updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(localTheme).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
              {key} Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={value}
                onChange={(e) => setLocalTheme({ ...localTheme, [key]: e.target.value })}
                className="h-10 w-20 rounded border border-gray-700 bg-dark"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => setLocalTheme({ ...localTheme, [key]: e.target.value })}
                className="flex-1 px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Theme</span>
        </button>
      </div>
    </div>
  );
}