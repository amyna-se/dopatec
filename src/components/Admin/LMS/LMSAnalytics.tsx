import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Activity } from 'lucide-react';
import { useAuth } from '../../../stores/auth';
import { AdminChart } from '../AdminChart';

export function LMSAnalytics() {
  const { userStats } = useAuth();

  const metrics = [
    {
      title: 'Total Users',
      value: userStats?.totalUsers || 0,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: userStats?.activeUsers || 0,
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Completed Courses',
      value: userStats?.completedCourses || 0,
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Average Score',
      value: `${userStats?.averageScore || 0}%`,
      icon: Award,
      color: 'yellow'
    }
  ];

  const locationData = Object.entries(userStats?.userLocations || {}).map(([name, value]) => ({
    name,
    value
  }));

  const userTypeData = Object.entries(userStats?.userTypes || {}).map(([name, value]) => ({
    name,
    value
  }));

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
          <h3 className="text-lg font-semibold text-white mb-4">User Locations</h3>
          <AdminChart data={locationData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-light p-6 rounded-lg border border-neon-blue/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">User Types</h3>
          <AdminChart data={userTypeData} />
        </motion.div>
      </div>
    </div>
  );
}