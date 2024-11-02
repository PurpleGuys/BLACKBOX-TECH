"use client";

import { motion } from "framer-motion";
import type { Theme } from "@/lib/themeStore";

interface ThemeSelectorProps {
  themes: Theme[];
  currentTheme: Theme;
  onSelectTheme: (themeId: string) => void;
}

export function ThemeSelector({ themes, currentTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <motion.button
          key={theme.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectTheme(theme.id)}
          className={`relative p-6 rounded-lg bg-black/40 ${theme.borderColor} ${
            currentTheme.id === theme.id ? 'ring-2' : ''
          } ring-${theme.accent}-500 transition-all duration-300`}
        >
          <div className="space-y-4">
            <div className={`text-xl font-bold bg-gradient-to-r ${theme.textGradient} bg-clip-text text-transparent`}>
              {theme.name}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-8 rounded-md bg-gradient-to-r ${theme.primary}`} />
              <div className={`h-8 rounded-md bg-gradient-to-r ${theme.secondary}`} />
              <div className={`h-8 rounded-md bg-gradient-to-br ${theme.background}`} />
            </div>

            {currentTheme.id === theme.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute inset-0 rounded-lg ring-2 ring-${theme.accent}-500`}
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}