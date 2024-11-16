import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, X, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLearningPaths } from '../../../stores/modules/learningPaths';
import toast from 'react-hot-toast';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  prerequisites: string[];
  modules: string[];
  estimatedHours: number;
}

export function LearningPathEditor() {
  const { paths, addPath, updatePath } = useLearningPaths();
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  const handleAddPath = () => {
    const newPath: LearningPath = {
      id: `path-${Date.now()}`,
      title: 'New Learning Path',
      description: '',
      category: '',
      prerequisites: [],
      modules: [],
      estimatedHours: 0
    };
    setEditingPath(newPath);
  };

  const handleSavePath = () => {
    if (!editingPath) return;

    if (paths[editingPath.id]) {
      updatePath(editingPath.id, editingPath);
      toast.success('Learning path updated successfully');
    } else {
      addPath(editingPath);
      toast.success('Learning path created successfully');
    }
    setEditingPath(null);
  };

  const handleArrayInput = (field: 'prerequisites' | 'modules', value: string) => {
    if (!editingPath) return;
    setEditingPath({
      ...editingPath,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean)
    });
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Learning Paths</h2>
        <button
          onClick={handleAddPath}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Path</span>
        </button>
      </div>

      <div className="space-y-4">
        {Object.values(paths).map((path) => (
          <div
            key={path.id}
            className="border border-neon-blue/10 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 bg-dark-light cursor-pointer"
              onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                <p className="text-gray-400">{path.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPath(path);
                  }}
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {expandedPath === path.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {expandedPath === path.id && (
              <div className="p-4 border-t border-neon-blue/10">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Prerequisites</h4>
                    <ul className="mt-2 list-disc list-inside text-gray-300">
                      {path.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Modules</h4>
                    <ul className="mt-2 list-disc list-inside text-gray-300">
                      {path.modules.map((module, index) => (
                        <li key={index}>{module}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-gray-400">
                    Estimated duration: {path.estimatedHours} hours
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingPath && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-dark-light rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {paths[editingPath.id] ? 'Edit Learning Path' : 'New Learning Path'}
              </h3>
              <button
                onClick={() => setEditingPath(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingPath.title}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    title: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={editingPath.description}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    description: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={editingPath.category}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    category: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Prerequisites (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingPath.prerequisites.join(', ')}
                  onChange={(e) => handleArrayInput('prerequisites', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Modules (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingPath.modules.join(', ')}
                  onChange={(e) => handleArrayInput('modules', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  value={editingPath.estimatedHours}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    estimatedHours: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingPath(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePath}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Path</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}