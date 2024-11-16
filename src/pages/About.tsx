import { motion } from 'framer-motion';
import { Brain, Heart, Users } from 'lucide-react';
import { useSiteSettings } from '../stores/modules/siteSettings';

export function About() {
  const { content } = useSiteSettings();
  const { title, content: aboutContent, mission, vision } = content.pages.about;

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] text-center mb-12">
            {title}
          </h1>

          <div className="prose prose-invert max-w-3xl mx-auto mb-16">
            <p className="text-xl text-gray-400 text-center">
              {aboutContent}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">Our Mission</h3>
              <p className="text-gray-400">{mission}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-[var(--color-secondary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">Our Vision</h3>
              <p className="text-gray-400">{vision}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-accent)] mb-4">Our Community</h3>
              <p className="text-gray-400">Join thousands of learners committed to understanding and supporting neurodiversity.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}