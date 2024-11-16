import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, Award, Brain, Activity, 
  Layout, Search, Calendar, FileText, 
  DollarSign, Package, PieChart, Settings
} from 'lucide-react';
import { ModuleCard } from '../components/Admin/ModuleCard';
import { ModuleEditor } from '../components/Admin/ModuleEditor';

// LMS Components
import { UserManager } from '../components/Admin/LMS/UserManager';
import { CourseEditor } from '../components/Admin/LMS/CourseEditor';
import { LearningPathEditor } from '../components/Admin/LMS/LearningPathEditor';
import { OnboardingEditor } from '../components/Admin/LMS/OnboardingEditor';
import { LMSAnalytics } from '../components/Admin/LMS/LMSAnalytics';

// CMS Components
import { SiteEditor } from '../components/Admin/CMS/SiteEditor';
import { SEOEditor } from '../components/Admin/CMS/SEOEditor';
import { CMSAnalytics } from '../components/Admin/CMS/CMSAnalytics';

// Clinic Components
import { ClinicCalendar } from '../components/Admin/Clinic/ClinicCalendar';
import { ComplianceManager } from '../components/Admin/Clinic/ComplianceManager';
import { PatientManager } from '../components/Admin/Clinic/PatientManager';
import { BookingManager } from '../components/Admin/Clinic/BookingManager';
import { ClinicAnalytics } from '../components/Admin/Clinic/ClinicAnalytics';

// Economy Components
import { InventoryManager } from '../components/Admin/Economy/InventoryManager';
import { ExpenseManager } from '../components/Admin/Economy/ExpenseManager';
import { IncomeManager } from '../components/Admin/Economy/IncomeManager';
import { EconomyAnalytics } from '../components/Admin/Economy/EconomyAnalytics';

type SystemType = 'lms' | 'cms' | 'clinic' | 'economy';
type ModuleType = string;

export function AdminDashboard() {
  const [activeSystem, setActiveSystem] = useState<SystemType>('lms');
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);

  const systems = {
    lms: {
      title: 'Learning Management',
      modules: [
        {
          id: 'users',
          title: 'User Management',
          description: 'Manage users and permissions',
          icon: Users,
          color: 'green',
          component: UserManager
        },
        {
          id: 'courses',
          title: 'Course Editor',
          description: 'Create and edit courses',
          icon: BookOpen,
          color: 'blue',
          component: CourseEditor
        },
        {
          id: 'learning-paths',
          title: 'Learning Paths',
          description: 'Design and manage learning paths',
          icon: Award,
          color: 'purple',
          component: LearningPathEditor
        },
        {
          id: 'onboarding',
          title: 'Onboarding Manager',
          description: 'Customize onboarding flow',
          icon: Brain,
          color: 'pink',
          component: OnboardingEditor
        },
        {
          id: 'lms-analytics',
          title: 'LMS Analytics',
          description: 'Learning platform metrics',
          icon: Activity,
          color: 'yellow',
          component: LMSAnalytics
        }
      ]
    },
    cms: {
      title: 'Content Management',
      modules: [
        {
          id: 'site-editor',
          title: 'Site Editor',
          description: 'Customize site appearance and content',
          icon: Layout,
          color: 'blue',
          component: SiteEditor
        },
        {
          id: 'seo',
          title: 'SEO Manager',
          description: 'Manage SEO settings',
          icon: Search,
          color: 'green',
          component: SEOEditor
        },
        {
          id: 'cms-analytics',
          title: 'CMS Analytics',
          description: 'Content performance metrics',
          icon: Activity,
          color: 'purple',
          component: CMSAnalytics
        }
      ]
    },
    clinic: {
      title: 'Clinic Management',
      modules: [
        {
          id: 'calendar',
          title: 'Calendar',
          description: 'Manage clinic schedule',
          icon: Calendar,
          color: 'blue',
          component: ClinicCalendar
        },
        {
          id: 'compliance',
          title: 'Compliance',
          description: 'Manage compliance requirements',
          icon: FileText,
          color: 'green',
          component: ComplianceManager
        },
        {
          id: 'patients',
          title: 'Patient Manager',
          description: 'Manage patient data',
          icon: Users,
          color: 'purple',
          component: PatientManager
        },
        {
          id: 'booking',
          title: 'Booking System',
          description: 'Manage appointments',
          icon: Calendar,
          color: 'pink',
          component: BookingManager
        },
        {
          id: 'clinic-analytics',
          title: 'Clinic Analytics',
          description: 'Clinic performance metrics',
          icon: Activity,
          color: 'yellow',
          component: ClinicAnalytics
        }
      ]
    },
    economy: {
      title: 'Economy Management',
      modules: [
        {
          id: 'inventory',
          title: 'Inventory',
          description: 'Manage clinic inventory',
          icon: Package,
          color: 'blue',
          component: InventoryManager
        },
        {
          id: 'expenses',
          title: 'Expenses',
          description: 'Track and manage expenses',
          icon: DollarSign,
          color: 'red',
          component: ExpenseManager
        },
        {
          id: 'income',
          title: 'Income',
          description: 'Track and manage income',
          icon: DollarSign,
          color: 'green',
          component: IncomeManager
        },
        {
          id: 'economy-analytics',
          title: 'Financial Analytics',
          description: 'Financial performance metrics',
          icon: PieChart,
          color: 'purple',
          component: EconomyAnalytics
        }
      ]
    }
  };

  const renderModule = () => {
    if (!activeModule || !activeSystem) return null;
    const module = systems[activeSystem].modules.find(m => m.id === activeModule);
    if (!module) return null;
    const Component = module.component;
    return <Component />;
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your platform</p>
          </div>
          <div className="flex space-x-4">
            {(Object.keys(systems) as SystemType[]).map((system) => (
              <button
                key={system}
                onClick={() => setActiveSystem(system)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeSystem === system
                    ? 'bg-neon-purple text-white'
                    : 'bg-dark-light text-gray-400 hover:bg-neon-purple/20'
                }`}
              >
                {systems[system].title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {systems[activeSystem].modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              color={module.color}
              stats={[]}
              onEdit={() => setActiveModule(module.id)}
            />
          ))}
        </div>

        {activeModule && (
          <ModuleEditor
            title={systems[activeSystem].modules.find(m => m.id === activeModule)?.title || ''}
            onClose={() => setActiveModule(null)}
          >
            {renderModule()}
          </ModuleEditor>
        )}
      </div>
    </div>
  );
}