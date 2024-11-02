"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Theme {
  id: string;
  name: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  border: string;
  card: {
    background: string;
    hover: string;
    border: string;
  };
  gradient: {
    primary: string;
    secondary: string;
  };
  stats: {
    background: string;
    border: string;
  };
}

interface ThemeState {
  currentTheme: string;
  displayTitle: string;
  displaySubtitle: string;
  marqueeText: string;
  logoIcon: string;
  cardStyle: 'minimal' | 'gradient' | 'glass';
  animationSpeed: 'slow' | 'normal' | 'fast';
  showTotalRevenue: boolean;
  themes: Record<string, Theme>;
  setTheme: (theme: string) => void;
  setDisplayTitle: (title: string) => void;
  setDisplaySubtitle: (subtitle: string) => void;
  setMarqueeText: (text: string) => void;
  setLogoIcon: (icon: string) => void;
  setCardStyle: (style: 'minimal' | 'gradient' | 'glass') => void;
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  setShowTotalRevenue: (show: boolean) => void;
  getCurrentTheme: () => Theme;
}

const defaultThemes: Record<string, Theme> = {
  purple: {
    id: 'purple',
    name: 'Violet Royal',
    background: 'from-purple-900 via-purple-950 to-black',
    text: {
      primary: 'text-purple-300',
      secondary: 'text-purple-200',
      accent: 'text-fuchsia-400',
    },
    border: 'border-purple-500/30',
    card: {
      background: 'bg-black/50',
      hover: 'hover:bg-purple-900/30',
      border: 'border-purple-500/30',
    },
    gradient: {
      primary: 'from-purple-400 via-fuchsia-500 to-purple-600',
      secondary: 'from-fuchsia-400 via-purple-500 to-fuchsia-600',
    },
    stats: {
      background: 'bg-purple-500/15',
      border: 'border-purple-500/30',
    },
  },
  blue: {
    id: 'blue',
    name: 'Azure Profond',
    background: 'from-blue-800 via-blue-950 to-black',
    text: {
      primary: 'text-blue-300',
      secondary: 'text-blue-200',
      accent: 'text-cyan-400',
    },
    border: 'border-blue-500/30',
    card: {
      background: 'bg-black/50',
      hover: 'hover:bg-blue-900/30',
      border: 'border-blue-500/30',
    },
    gradient: {
      primary: 'from-blue-400 via-cyan-500 to-blue-600',
      secondary: 'from-cyan-400 via-blue-500 to-cyan-600',
    },
    stats: {
      background: 'bg-blue-500/15',
      border: 'border-blue-500/30',
    },
  },
  emerald: {
    id: 'emerald',
    name: 'Émeraude Luxe',
    background: 'from-emerald-800 via-emerald-950 to-black',
    text: {
      primary: 'text-emerald-300',
      secondary: 'text-emerald-200',
      accent: 'text-teal-400',
    },
    border: 'border-emerald-500/30',
    card: {
      background: 'bg-black/50',
      hover: 'hover:bg-emerald-900/30',
      border: 'border-emerald-500/30',
    },
    gradient: {
      primary: 'from-emerald-400 via-teal-500 to-emerald-600',
      secondary: 'from-teal-400 via-emerald-500 to-teal-600',
    },
    stats: {
      background: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
    },
  },
};

const initialState = {
  currentTheme: 'purple',
  displayTitle: 'BLACKBOX EVENTS',
  displaySubtitle: 'Trading Bar Experience',
  marqueeText: 'Bienvenue sur l\'affichage des prix en temps réel • Prix mis à jour en direct • Suivez les tendances du marché',
  logoIcon: 'GlassWater',
  cardStyle: 'glass' as const,
  animationSpeed: 'normal' as const,
  showTotalRevenue: true,
  themes: defaultThemes,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setTheme: (theme) => set({ currentTheme: theme }),
      setDisplayTitle: (title) => set({ displayTitle: title }),
      setDisplaySubtitle: (subtitle) => set({ displaySubtitle: subtitle }),
      setMarqueeText: (text) => set({ marqueeText: text }),
      setLogoIcon: (icon) => set({ logoIcon: icon }),
      setCardStyle: (style) => set({ cardStyle: style }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      setShowTotalRevenue: (show) => set({ showTotalRevenue: show }),
      getCurrentTheme: () => {
        const state = get();
        return state.themes[state.currentTheme] || state.themes.purple;
      },
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...initialState,
            ...persistedState,
            themes: defaultThemes,
          };
        }
        return persistedState;
      },
    }
  )
);