import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ChevronDown, ChevronUp, Plus, Trash } from 'lucide-react';
import { useSiteSettings } from '../../../stores/modules/siteSettings';
import toast from 'react-hot-toast';

export function ContentEditor() {
  const { content, updateContent } = useSiteSettings();
  const [localContent, setLocalContent] = useState(content);
  const [expandedSection, setExpandedSection] = useState<string | null>('home');

  const handleSave = () => {
    updateContent(localContent);
    toast.success('Content updated successfully');
  };

  const updateNestedContent = (path: string[], value: any) => {
    const newContent = { ...localContent };
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setLocalContent(newContent);
  };

  const addFeature = () => {
    const newFeature = {
      title: 'New Feature',
      description: 'Feature description'
    };
    const newFeatures = [...localContent.pages.home.features, newFeature];
    updateNestedContent(['pages', 'home', 'features'], newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = localContent.pages.home.features.filter((_, i) => i !== index);
    updateNestedContent(['pages', 'home', 'features'], newFeatures);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={localContent.name}
            onChange={(e) => setLocalContent({ ...localContent, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
          />
        </div>

        {Object.entries(localContent.pages).map(([pageKey, pageContent]) => (
          <div key={pageKey} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === pageKey ? null : pageKey)}
              className="w-full px-4 py-2 bg-dark-light flex items-center justify-between text-left"
            >
              <span className="text-white capitalize">{pageKey} Page</span>
              {expandedSection === pageKey ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSection === pageKey && (
              <div className="p-4 space-y-4">
                {pageKey === 'home' ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Hero Section</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={pageContent.hero.title}
                          onChange={(e) => updateNestedContent(['pages', 'home', 'hero', 'title'], e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={pageContent.hero.subtitle}
                          onChange={(e) => updateNestedContent(['pages', 'home', 'hero', 'subtitle'], e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Features</h3>
                        <button
                          onClick={addFeature}
                          className="px-2 py-1 rounded bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Feature</span>
                        </button>
                      </div>
                      {pageContent.features.map((feature: any, index: number) => (
                        <div key={index} className="p-4 border border-gray-700 rounded-lg space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={feature.title}
                                  onChange={(e) => {
                                    const newFeatures = [...pageContent.features];
                                    newFeatures[index].title = e.target.value;
                                    updateNestedContent(['pages', 'home', 'features'], newFeatures);
                                  }}
                                  className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  value={feature.description}
                                  onChange={(e) => {
                                    const newFeatures = [...pageContent.features];
                                    newFeatures[index].description = e.target.value;
                                    updateNestedContent(['pages', 'home', 'features'], newFeatures);
                                  }}
                                  className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => removeFeature(index)}
                              className="ml-4 p-2 rounded bg-red-500/20 text-red-500 hover:bg-red-500/30 transition"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  Object.entries(pageContent).map(([key, value]) => {
                    if (typeof value === 'string') {
                      return (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                            {key}
                          </label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateNestedContent(['pages', pageKey, key], e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white"
                          />
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Content</span>
        </button>
      </div>
    </div>
  );
}