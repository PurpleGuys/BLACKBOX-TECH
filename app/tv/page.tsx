"use client";

import { useEffect, useState } from "react";
import { useDrinkStore } from "@/lib/store";
import { motion } from "framer-motion";
import { PriceCard } from "./components/PriceCard";
import { TopDrinks } from "./components/TopDrinks";
import { StatsPanel } from "./components/StatsPanel";
import { Header } from "./components/Header";
import { MarqueeText } from "./components/MarqueeText";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

export default function TVDisplay() {
  const { drinks } = useDrinkStore();
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const revenue = drinks.reduce((acc, drink) => acc + (drink.currentPrice * drink.purchases), 0);
    setTotalRevenue(revenue);
  }, [drinks]);

  const getAnimationDuration = () => {
    return 4; // Default animation duration
  };

  const updatedFloatingAnimation = {
    ...floatingAnimation,
    transition: {
      ...floatingAnimation.transition,
      duration: getAnimationDuration()
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <Header />
      
      <MarqueeText text="Bienvenue sur l'affichage des prix en temps réel • Prix mis à jour en direct • Suivez les tendances du marché" />
      
      <motion.div 
        className="relative max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-4 lg:p-8 h-[calc(100vh-180px)]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Left Panel - Stats & Ranking */}
        <motion.div 
          className="lg:col-span-3"
          variants={item}
        >
          <motion.div
            animate={updatedFloatingAnimation}
            className="h-full"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-black/40 border border-purple-500/20 backdrop-blur-xl rounded-lg p-4"
            >
              <div className="grid grid-cols-1 gap-4">
                <StatsPanel totalRevenue={totalRevenue} />
                <TopDrinks drinks={drinks} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Panel - Prices */}
        <motion.div 
          className="lg:col-span-9"
          variants={item}
        >
          <motion.div 
            variants={container} 
            className="h-full"
          >
            <motion.div
              variants={item}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr"
            >
              {drinks.map((drink, index) => (
                <motion.div
                  key={drink.id}
                  variants={item}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  animate={updatedFloatingAnimation}
                  custom={index}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <PriceCard 
                    drink={drink} 
                    cardStyle="glass"
                    animationSpeed="normal"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}