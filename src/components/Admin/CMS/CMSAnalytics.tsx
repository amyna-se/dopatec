import { motion } from 'framer-motion';
import { Eye, Clock, MousePointer, ArrowUp } from 'lucide-react';
import { AdminChart } from '../AdminChart';

export function CMSAnalytics() {
  // Example analytics data - in a real app, this would come from your analytics service
  const metrics = [
    {
      title: 'Page Views',
      value: '12,345',
      change: '+15%',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Avg. Time on Site',
      value: '4:32',
      change: '+8%',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Click Rate',
      value: '3.2%',
      change: '+5%',
      icon: MousePointer,
      color: 'purple'
    },
    {
      title: 'Bounce Rate',
      value: '42%',
      change: '-3%',
      icon: ArrowUp,
      color: 'yellow'
    }
  ];

  const pageViews = [
    { name: 'Home', value: 5234 },
    { name: 'About', value: 3421 },
    { name: 'Courses', value: 4532 },
    { name: 'Contact', value: 2345 }
  ];

  const sources = [
    { name: 'Direct', value: 45 },
    { name: 'Search', value: 30 },
    { name: 'Social', value: 15 },
    { name: 'Referral', value: 10 }
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
          <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
          <AdminChart data={pageViews} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-light p-6 rounded-lg border border-neon-blue/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <AdminChart data={sources} />
        </motion.div>
      </div>
    </div>
  );
}