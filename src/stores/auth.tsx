import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { quizData } from '../data/quizData';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  completedCourses: number;
  averageScore: number;
  totalXP: number;
  currentStreak: number;
  lastLoginDate: string;
  userLocations: {
    Stockholm: number;
    Malmö: number;
    Göteborg: number;
  };
  userTypes: {
    'Person with diagnosis': number;
    'Parent': number;
    'Family member': number;
    'Spouse': number;
  };
}

interface AuthStore {
  isAuthenticated: boolean;
  user: any | null;
  userStats: UserStats | null;
  courseProgress: Record<string, number>;
  courses: typeof quizData;
  login: (userData: any) => void;
  logout: () => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
}

const defaultStats: UserStats = {
  totalUsers: 0,
  activeUsers: 0,
  completedCourses: 0,
  averageScore: 0,
  totalXP: 0,
  currentStreak: 0,
  lastLoginDate: new Date().toISOString(),
  userLocations: {
    Stockholm: 0,
    Malmö: 0,
    Göteborg: 0
  },
  userTypes: {
    'Person with diagnosis': 0,
    'Parent': 0,
    'Family member': 0,
    'Spouse': 0
  }
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      userStats: defaultStats,
      courseProgress: {},
      courses: quizData,
      login: (userData) => set({ 
        isAuthenticated: true, 
        user: userData,
        userStats: defaultStats,
        courses: quizData
      }),
      logout: () => set({ 
        isAuthenticated: false, 
        user: null,
        courseProgress: {},
        userStats: defaultStats,
        courses: quizData
      }),
      updateUserStats: (stats) =>
        set((state) => ({
          userStats: state.userStats ? { ...state.userStats, ...stats } : stats
        })),
      updateCourseProgress: (courseId, progress) =>
        set((state) => {
          const newProgress = { ...state.courseProgress, [courseId]: progress };
          const completedCourses = Object.values(newProgress).filter(p => p >= 100).length;
          
          return {
            courseProgress: newProgress,
            userStats: {
              ...(state.userStats || defaultStats),
              completedCourses,
              totalXP: completedCourses * 100 + Math.floor(Object.values(newProgress).reduce((a, b) => a + b, 0) / 2)
            }
          };
        })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        courseProgress: state.courseProgress,
        userStats: state.userStats
      })
    }
  )
);