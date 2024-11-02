"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useThemeStore } from "@/lib/themeStore";

export function Header() {
  const { displayTitle, displaySubtitle, logoIcon, currentTheme } = useThemeStore();
  const IconComponent = (LucideIcons as any)[logoIcon] || LucideIcons.GlassWater;

  const defaultTheme = {
    background: "bg-black/40",
    border: "border-purple-500/20",
    text: {
      primary: "text-purple-400",
      secondary: "text-purple-300/80"
    },
    gradients: {
      primary: "from-purple-400 to-purple-600"
    }
  };

  return (
    <div className="relative z-20">
      <div className={`${defaultTheme.background} backdrop-blur-xl border-b ${defaultTheme.border}`}>
        <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`p-2 rounded-xl ${defaultTheme.background}`}
              >
                <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${defaultTheme.text.primary}`} />
              </motion.div>
              <div>
                <motion.h1 
                  className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${defaultTheme.gradients.primary} bg-clip-text text-transparent font-display`}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {displayTitle}
                </motion.h1>
                <motion.p 
                  className={defaultTheme.text.secondary}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {displaySubtitle}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}