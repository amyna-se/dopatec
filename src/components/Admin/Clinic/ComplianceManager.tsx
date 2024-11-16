import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Save, X, AlertTriangle } from 'lucide-react';
import { useCompliance } from '../../../stores/modules/compliance';
import toast from 'react-hot-toast';

export function ComplianceManager() {
  const { requirements, addRequirement, updateRequirement } = useCompliance();
  const [editingRequirement, setEditingRequirement] = useState<any | null>(null);

  const handleAddRequirement = () => {
    const newRequirement = {
      id: `req-${Date.now()}`,
      title: '',
      description: '',
      category: '',
      regulatoryBody: '',
      frequency: 6,
      requiredCertifications: [],
      mandatoryTraining: [],
      documents: []
    };
    setEditingRequirement(newRequirement);
  };

  const handleSave = () => {
    if (!editingRequirement) return;

    if (requirements[editingRequirement.id]) {
      updateRequirement(editingRequirement.id, editingRequirement);
      toast.success('Requirement updated successfully');
    } else {
      addRequirement(editingRequirement);
      toast.success('Requirement added successfully');
    }
    setEditingRequirement(null);
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">Compliance Requirements</h2>
        </div>
        <button
          onClick={handleAddRequirement}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Requirement</span>
        </button>
      </div>

      <div className="space-y-4">
        {Object.values(requirements).map((requirement) => (
          <motion.div
            key={requirement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark rounded-lg p-4 border border-neon-blue/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{requirement.title}</h3>
                <p className="text-gray-400">{requirement.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue text-sm">
                  {requirement.category}
                </span>
                <button
                  onClick={() => setEditingRequirement(requirement)}
                  className="p-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Required Certifications</h4>
                <ul className="mt-2 list-disc list-inside">
                  {requirement.requiredCertifications.map((cert, index) => (
                    <li key={index} className="text-gray-300">{cert}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Mandatory Training</h4>
                <ul className="mt-2 list-disc list-inside">
                  {requirement.mandatoryTraining.map((training, index) => (
                    <li key={index} className="text-gray-300">{training}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {editingRequirement && (
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
                {editingRequirement.id ? 'Edit Requirement' : 'New Requirement'}
              </h3>
              <button
                onClick={() => setEditingRequirement(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Form fields for requirement details */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingRequirement(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Requirement</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}