import { motion } from 'framer-motion';
import { Users, Calendar, FileText, Activity } from 'lucide-react';
import { AdminChart } from '../AdminChart';

export function ClinicAnalytics() {
  // Example analytics data
  const metrics = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+15%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Appointments',
      value: '156',
      change: '+8%',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Compliance Rate',
      value: '98%',
      change: '+2%',
      icon: FileText,
      color: 'purple'
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      icon: Activity,
      color: 'yellow'
    }
  ];

  const appointmentData = [
    { name: 'Consultations', value: 45 },
    { name: 'Follow-ups', value: 30 },
    { name: 'Assessments', value: 15 },
    { name: 'Other', value: 10 }
  ];

  const patientDistribution = [
    { name: 'New Patients', value: 25 },
    { name: 'Regular', value: 45 },
    { name: 'Returning', value: 20 },
    { name: 'Referred', value: 10 }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-dark-light p-6 rounded-lg border border-neon-${metric.color}/10`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <p className={`text-2xl font-bold mt-1 text-neon-${metric.color}`}>
                  {metric.value}
                </p>
                <span className={`text-sm ${
                  metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}
                </span>
              </div>
              <metric.icon className={`w-8 h-8 text-neon-${metric.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-light p-6 rounded-lg border border-neon-blue/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Appointment Types</h3>
          <AdminChart data={appointmentData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-light p-6 rounded-lg border border-neon-blue/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Patient Distribution</h3>
          <AdminChart data={patientDistribution} />
        </motion.div>
      </div>
    </div>
  );
}