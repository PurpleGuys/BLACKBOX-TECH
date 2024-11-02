"use client";

import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { Theme } from "@/lib/themeStore";

interface StatsPanelProps {
  totalRevenue: number;
  theme?: Theme;
}

const defaultTheme = {
  stats: {
    background: "bg-purple-500/15",
    border: "border-purple-500/30"
  },
  text: {
    primary: "text-purple-300",
    secondary: "text-purple-200",
    accent: "text-fuchsia-400"
  },
  gradient: {
    primary: "from-purple-400 via-fuchsia-500 to-purple-600",
    secondary: "from-fuchsia-400 via-purple-500 to-fuchsia-600"
  }
};

export function StatsPanel({ totalRevenue, theme = defaultTheme }: StatsPanelProps) {
  const getAnimationDuration = () => 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative z-10 ${theme.stats.background} rounded-xl p-4`}
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: getAnimationDuration() * 0.5 }}
          className={`p-2 ${theme.stats.background} rounded-xl`}
        >
          <Coins className={`w-6 h-6 ${theme.text.primary}`} />
        </motion.div>
        <h3 className={`text-lg font-bold bg-gradient-to-r ${theme.gradient.primary} bg-clip-text text-transparent`}>
          Revenus Totaux
        </h3>
      </div>

      <motion.div 
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <motion.span
          className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient.secondary} bg-clip-text text-transparent tracking-tight`}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: getAnimationDuration(), repeat: Infinity }}
        >
          {totalRevenue.toFixed(2)}€
        </motion.span>
      </motion.div>
    </motion.div>
  );
}