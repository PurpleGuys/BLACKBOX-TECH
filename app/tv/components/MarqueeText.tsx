"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/themeStore";

interface MarqueeTextProps {
  text: string;
  theme?: string;
}

export function MarqueeText({ text, theme = 'purple' }: MarqueeTextProps) {
  const defaultTheme = {
    text: {
      primary: "text-purple-400",
      secondary: "text-purple-300",
      accent: "text-fuchsia-400"
    },
    background: "bg-black/40"
  };

  return (
    <div className={`relative overflow-hidden py-2 ${defaultTheme.background}`}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`whitespace-nowrap ${defaultTheme.text.primary} text-sm md:text-base`}
      >
        {text}
      </motion.div>
    </div>
  );
}