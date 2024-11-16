import { motion } from 'framer-motion';
import { Brain, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserStats } from '../components/Stats/UserStats';
import { useAuth } from '../stores/auth';
import { useSiteSettings } from '../stores/modules/siteSettings';

export function Home() {
  const { isAuthenticated } = useAuth();
  const { content } = useSiteSettings();
  const { hero, features } = content.pages.home;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--color-primary)] animate-neon-pulse mb-6">
            {hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto px-4">
            {hero.subtitle}
          </p>

          <UserStats />

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 my-8 sm:my-12 px-4">
            <Link
              to={isAuthenticated ? "/quiz/autism-101" : "/auth"}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/30 transition text-base sm:text-lg font-medium"
            >
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Start Autism Course
            </Link>
            <Link
              to={isAuthenticated ? "/quiz/adhd-101" : "/auth"}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/30 transition text-base sm:text-lg font-medium"
            >
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Start ADHD Course
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left px-4 mt-8 sm:mt-12">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-[var(--color-background)] border border-[var(--color-primary)]/10">
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}