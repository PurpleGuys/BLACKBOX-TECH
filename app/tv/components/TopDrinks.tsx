"use client";

import { Trophy, Medal, Sparkles } from "lucide-react";
import { Drink } from "@/types/drinks";
import { motion } from "framer-motion";
import { Theme } from "@/lib/themeStore";

interface TopDrinksProps {
  drinks: Drink[];
  theme?: Theme;
}

const defaultTheme = {
  text: {
    primary: "text-purple-300",
    secondary: "text-purple-200",
    accent: "text-fuchsia-400",
  },
  stats: {
    background: "bg-purple-500/15",
    border: "border-purple-500/30",
  },
  gradient: {
    primary: "from-purple-400 via-fuchsia-500 to-purple-600",
    secondary: "from-fuchsia-400 via-purple-500 to-fuchsia-600",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function TopDrinks({ drinks, theme = defaultTheme }: TopDrinksProps) {
  const getAnimationDuration = () => 2;

  const medals = [
    { color: theme.text.primary, bg: theme.stats.background, shadow: `shadow-${theme.text.primary}`, icon: "✨" },
    { color: theme.text.secondary, bg: theme.stats.background, shadow: `shadow-${theme.text.secondary}`, icon: "🌟" },
    { color: theme.text.accent, bg: theme.stats.background, shadow: `shadow-${theme.text.accent}`, icon: "⭐" },
  ];

  const sortedDrinks = [...drinks]
    .sort((a, b) => b.currentPrice - a.currentPrice)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative z-10 ${theme.stats.background} rounded-xl p-4`}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: getAnimationDuration() * 0.5 }}
          className={`p-2 ${theme.stats.background} rounded-xl`}
        >
          <Trophy className={theme.text.primary} />
        </motion.div>
        <h3 className={`text-lg font-bold bg-gradient-to-r ${theme.gradient.primary} bg-clip-text text-transparent`}>
          Top Prix
        </h3>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {sortedDrinks.map((drink, index) => (
          <motion.div
            key={drink.id}
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`flex items-center justify-between p-2 ${medals[index].bg} rounded-lg transition-all duration-300 ${medals[index].shadow} relative overflow-hidden group/item`}
          >
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: getAnimationDuration() * 0.5 }}
                className="relative"
              >
                <Medal className={medals[index].color} />
                <motion.div
                  className="absolute -top-1 -right-1 text-xs"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: getAnimationDuration(), repeat: Infinity }}
                >
                  {medals[index].icon}
                </motion.div>
              </motion.div>
              <span className={theme.text.primary}>{drink.name}</span>
            </div>
            <motion.div
              className="flex items-center gap-1"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: getAnimationDuration(), repeat: Infinity }}
            >
              <span className={`text-base font-bold bg-gradient-to-r ${theme.gradient.primary} bg-clip-text text-transparent`}>
                {drink.currentPrice.toFixed(2)}€
              </span>
              <Sparkles className={`w-3 h-3 ${theme.text.accent}`} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}