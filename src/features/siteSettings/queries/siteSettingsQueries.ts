import { SiteTheme, SiteContent } from '../../../stores/modules/siteSettings';

export const siteSettingsQueries = {
  getSettings: async (): Promise<{ theme: SiteTheme; content: SiteContent }> => {
    try {
      const response = await fetch('/api/site-settings');
      if (!response.ok) {
        throw new Error('Failed to fetch site settings');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getTheme: async (): Promise<SiteTheme> => {
    try {
      const response = await fetch('/api/site-settings/theme');
      if (!response.ok) {
        throw new Error('Failed to fetch theme');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getContent: async (): Promise<SiteContent> => {
    try {
      const response = await fetch('/api/site-settings/content');
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};