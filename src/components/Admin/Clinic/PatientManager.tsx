import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Save, X, Search } from 'lucide-react';
import { useUsers } from '../../../stores/users';
import toast from 'react-hot-toast';

export function PatientManager() {
  const { users, addUser, updateUser } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPatient, setEditingPatient] = useState<any | null>(null);

  const patients = Object.values(users).filter(user => 
    user.role === 'patient' &&
    (searchQuery === '' || 
     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddPatient = () => {
    setEditingPatient({
      id: `patient-${Date.now()}`,
      name: '',
      email: '',
      role: 'patient',
      medicalHistory: [],
      appointments: [],
      notes: ''
    });
  };

  const handleSave = () => {
    if (!editingPatient) return;

    if (users[editingPatient.id]) {
      updateUser(editingPatient.id, editingPatient);
      toast.success('Patient updated successfully');
    } else {
      addUser(editingPatient);
      toast.success('Patient added successfully');
    }
    setEditingPatient(null);
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">Patient Management</h2>
        </div>
        <button
          onClick={handleAddPatient}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 bg-dark rounded-lg border border-neon-blue/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
          />
        </div>
      </div>

      <div className="space-y-4">
        {patients.map((patient) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark rounded-lg p-4 border border-neon-blue/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                <p className="text-gray-400">{patient.email}</p>
              </div>
              <button
                onClick={() => setEditingPatient(patient)}
                className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingPatient && (
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
                {editingPatient.id ? 'Edit Patient' : 'New Patient'}
              </h3>
              <button
                onClick={() => setEditingPatient(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Form fields for patient details */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingPatient(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Patient</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}