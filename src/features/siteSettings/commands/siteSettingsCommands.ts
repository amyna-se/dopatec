import { SiteTheme, SiteContent } from '../../../stores/modules/siteSettings';

interface UpdateThemeCommand {
  theme: Partial<SiteTheme>;
}

interface UpdateContentCommand {
  content: Partial<SiteContent>;
}

export const siteSettingsCommands = {
  updateTheme: async (command: UpdateThemeCommand): Promise<void> => {
    try {
      const response = await fetch('/api/site-settings/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command.theme)
      });

      if (!response.ok) {
        throw new Error('Failed to update theme');
      }
    } catch (error) {
      throw error;
    }
  },

  updateContent: async (command: UpdateContentCommand): Promise<void> => {
    try {
      const response = await fetch('/api/site-settings/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command.content)
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }
    } catch (error) {
      throw error;
    }
  },

  resetToDefaults: async (): Promise<void> => {
    try {
      const response = await fetch('/api/site-settings/reset', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to reset settings');
      }
    } catch (error) {
      throw error;
    }
  }
};