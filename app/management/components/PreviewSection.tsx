"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useThemeStore } from "@/lib/themeStore";

export function PreviewSection() {
  const store = useThemeStore();
  const currentTheme = store.getCurrentTheme();
  const Icon = LucideIcons[store.logoIcon as keyof typeof LucideIcons];
  
  if (!Icon || typeof Icon !== "function") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className={`text-lg font-semibold text-${currentTheme.accent}-300 mb-4`}>Aperçu</h3>
      
      <div className={`p-6 rounded-lg bg-black/60 ${currentTheme.borderColor}`}>
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-3 bg-${currentTheme.accent}-500/20 rounded-xl`}
          >
            <Icon className={`w-8 h-8 text-${currentTheme.accent}-400`} />
          </motion.div>
          
          <div className="space-y-1">
            <motion.h2
              style={{ fontFamily: store.customFont }}
              className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`}
            >
              {store.displayTitle}
            </motion.h2>
            <motion.p className={`text-${currentTheme.accent}-400/80 text-sm`}>
              {store.displaySubtitle}
            </motion.p>
          </div>
        </div>

        <motion.div
          className={`mt-6 p-3 bg-${currentTheme.accent}-500/10 rounded-lg overflow-hidden`}
        >
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              duration: store.animationSpeed === 'slow' ? 30 : store.animationSpeed === 'fast' ? 15 : 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`whitespace-nowrap text-${currentTheme.accent}-300`}
          >
            {store.marqueeText}
          </motion.div>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <motion.div
            className={`p-4 rounded-lg ${
              store.cardStyle === 'minimal'
                ? `bg-${currentTheme.accent}-500/10`
                : store.cardStyle === 'gradient'
                ? `bg-gradient-to-br ${currentTheme.primary}`
                : `backdrop-blur-xl bg-${currentTheme.accent}-500/20`
            }`}
          >
            <div className="text-white text-sm">Exemple de carte</div>
          </motion.div>
          
          {store.showTotalRevenue && (
            <motion.div
              className={`p-4 rounded-lg ${
                store.cardStyle === 'minimal'
                  ? `bg-${currentTheme.accent}-500/10`
                  : store.cardStyle === 'gradient'
                  ? `bg-gradient-to-br ${currentTheme.secondary}`
                  : `backdrop-blur-xl bg-${currentTheme.accent}-500/20`
              }`}
            >
              <div className="text-white text-sm">Total des revenus</div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}