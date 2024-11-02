"use client";

import { Card } from "@/components/ui/card";
import { Beer, Cocktail, Coffee, Wine, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Drink } from "@/types/drinks";
import { motion } from "framer-motion";
import { Theme } from "@/lib/themeStore";

interface PriceCardProps {
  drink: Drink;
  theme: Theme;
  cardStyle: 'minimal' | 'gradient' | 'glass';
  animationSpeed: 'slow' | 'normal' | 'fast';
}

const icons = {
  Beer,
  Cocktail,
  Coffee,
  Wine,
} as const;

export function PriceCard({ drink, theme, cardStyle, animationSpeed }: PriceCardProps) {
  const IconComponent = icons[drink.icon as keyof typeof icons] || Beer;
  const priceChange = drink.currentPrice - drink.basePrice;
  const isUp = priceChange > 0;

  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case 'slow': return 3;
      case 'fast': return 1;
      default: return 2;
    }
  };

  const getCardStyle = () => {
    if (!theme?.card) return 'bg-black/50 border-purple-500/30';

    switch (cardStyle) {
      case 'minimal':
        return `${theme.card.background} ${theme.border}`;
      case 'gradient':
        return `bg-gradient-to-br ${theme.gradient.primary}`;
      case 'glass':
        return `backdrop-blur-xl bg-black/40 ${theme.border}`;
      default:
        return theme.card.background;
    }
  };

  return (
    <Card className={`p-6 h-full relative overflow-hidden group ${getCardStyle()}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 h-full flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: getAnimationDuration() * 0.5 }}
              className={`p-4 ${theme?.stats?.background || 'bg-purple-500/15'} rounded-2xl`}
            >
              <IconComponent className={theme?.text?.primary || 'text-purple-300'} />
            </motion.div>
            <motion.h3 
              className={`text-2xl font-bold bg-gradient-to-r ${theme?.gradient?.primary || 'from-purple-400 to-purple-600'} bg-clip-text text-transparent`}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: getAnimationDuration() * 1.5, repeat: Infinity }}
            >
              {drink.name}
            </motion.h3>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: getAnimationDuration(), repeat: Infinity }}
          >
            {isUp ? (
              <TrendingUp className="w-8 h-8 text-green-500" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-500" />
            )}
          </motion.div>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <motion.div
            className={`text-7xl font-bold bg-gradient-to-r ${theme?.gradient?.secondary || 'from-purple-400 to-purple-600'} bg-clip-text text-transparent tracking-tighter`}
            animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: getAnimationDuration() * 1.5, repeat: Infinity }}
          >
            {drink.currentPrice.toFixed(2)}€
          </motion.div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <motion.span 
              className={`${isUp ? 'text-green-500' : 'text-red-500'} font-medium flex items-center gap-2`}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: getAnimationDuration(), repeat: Infinity }}
            >
              {isUp ? "+" : ""}{priceChange.toFixed(2)}€
              <Sparkles className="w-4 h-4" />
            </motion.span>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: getAnimationDuration(), repeat: Infinity }}
            >
              <span className={theme?.text?.primary || 'text-purple-300'}>Popularité</span>
              <span className={theme?.text?.secondary || 'text-purple-200'}>{(drink.popularity * 10).toFixed(0)}%</span>
            </motion.div>
          </div>

          <div className={`h-2 ${theme?.stats?.background || 'bg-purple-500/15'} rounded-full overflow-hidden`}>
            <motion.div
              className={`h-full bg-gradient-to-r ${theme?.gradient?.primary || 'from-purple-400 to-purple-600'}`}
              initial={{ width: 0 }}
              animate={{ width: `${(drink.popularity / 10) * 100}%` }}
              transition={{ duration: getAnimationDuration() * 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {cardStyle === 'glass' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute top-0 right-0 w-32 h-32 ${theme?.stats?.background || 'bg-purple-500/15'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 left-0 w-32 h-32 ${theme?.stats?.background || 'bg-purple-500/15'} rounded-full blur-3xl`}></div>
        </div>
      )}
    </Card>
  );
}