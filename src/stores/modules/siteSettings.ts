import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SiteTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface SiteContent {
  name: string;
  logo: string;
  pages: {
    home: {
      hero: {
        title: string;
        subtitle: string;
      };
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    about: {
      title: string;
      content: string;
      mission: string;
      vision: string;
    };
    contact: {
      title: string;
      description: string;
      email: string;
      phone: string;
      address: string;
    };
  };
}

interface SiteSettingsState {
  theme: SiteTheme;
  content: SiteContent;
  updateTheme: (theme: Partial<SiteTheme>) => void;
  updateContent: (content: Partial<SiteContent>) => void;
  resetToDefaults: () => void;
}

const defaultTheme: SiteTheme = {
  primary: '#00f3ff',
  secondary: '#bf00ff',
  accent: '#00ff9d',
  background: '#0a0a0f',
  text: '#ffffff'
};

const defaultContent: SiteContent = {
  name: 'NeuroStep',
  logo: 'brain',
  pages: {
    home: {
      hero: {
        title: 'Learn Differently',
        subtitle: 'Master understanding of Autism and ADHD through interactive, game-based learning experiences.'
      },
      features: [
        {
          title: 'Interactive Learning',
          description: 'Engage with dynamic content designed to make learning enjoyable and effective.'
        },
        {
          title: 'Track Progress',
          description: 'Monitor your learning journey with detailed progress tracking and achievements.'
        },
        {
          title: 'Expert Content',
          description: 'Learn from carefully curated content developed by neurodiversity experts.'
        }
      ]
    },
    about: {
      title: 'About NeuroStep',
      content: "We're on a mission to transform how people understand and learn about neurodiversity through interactive, engaging experiences.",
      mission: 'To make learning about neurodiversity accessible, engaging, and effective through gamified education.',
      vision: 'Creating a world where understanding neurodiversity is accessible to everyone.'
    },
    contact: {
      title: 'Get in Touch',
      description: 'Have questions? We\'d love to hear from you.',
      email: 'contact@neurostep.se',
      phone: '+46 123 456 789',
      address: 'Stockholm, Sweden'
    }
  }
};

export const useSiteSettings = create<SiteSettingsState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      content: defaultContent,
      
      updateTheme: (newTheme) => 
        set((state) => ({
          theme: { ...state.theme, ...newTheme }
        })),
      
      updateContent: (newContent) =>
        set((state) => ({
          content: { ...state.content, ...newContent }
        })),
      
      resetToDefaults: () =>
        set({ theme: defaultTheme, content: defaultContent })
    }),
    {
      name: 'site-settings-storage'
    }
  )
);