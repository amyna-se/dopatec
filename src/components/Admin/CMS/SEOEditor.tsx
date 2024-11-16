import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Search, Globe, Link as LinkIcon } from 'lucide-react';
import { useSiteSettings } from '../../../stores/modules/siteSettings';
import toast from 'react-hot-toast';

export function SEOEditor() {
  const { content, updateContent } = useSiteSettings();
  const [seoData, setSeoData] = useState({
    title: content.pages.home.hero.title,
    description: content.pages.home.hero.subtitle,
    keywords: 'autism, adhd, neurodiversity, learning, education, online courses',
    ogImage: 'https://neurostep.se/og-image.jpg',
    twitterHandle: '@neurostep',
    canonicalUrl: 'https://neurostep.se',
    robotsTxt: `User-agent: *\nAllow: /\n\nSitemap: https://neurostep.se/sitemap.xml\n\nDisallow: /admin/*\nDisallow: /dashboard/*\nDisallow: /auth/*`
  });

  const handleSave = () => {
    updateContent({
      pages: {
        ...content.pages,
        home: {
          ...content.pages.home,
          hero: {
            ...content.pages.home.hero,
            title: seoData.title,
            subtitle: seoData.description
          }
        }
      }
    });
    toast.success('SEO settings updated successfully');
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center space-x-3 mb-6">
        <Search className="w-6 h-6 text-neon-purple" />
        <h2 className="text-xl font-bold text-white">SEO Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Meta Title
          </label>
          <input
            type="text"
            value={seoData.title}
            onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Meta Description
          </label>
          <textarea
            value={seoData.description}
            onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Keywords
          </label>
          <input
            type="text"
            value={seoData.keywords}
            onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            OG Image URL
          </label>
          <input
            type="text"
            value={seoData.ogImage}
            onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Twitter Handle
          </label>
          <input
            type="text"
            value={seoData.twitterHandle}
            onChange={(e) => setSeoData({ ...seoData, twitterHandle: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Canonical URL
          </label>
          <input
            type="text"
            value={seoData.canonicalUrl}
            onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            robots.txt Content
          </label>
          <textarea
            value={seoData.robotsTxt}
            onChange={(e) => setSeoData({ ...seoData, robotsTxt: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white font-mono text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}