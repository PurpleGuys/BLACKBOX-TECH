"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingDown, TrendingUp, AlertTriangle, Skull } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDrinkStore } from "@/lib/store";
import { DrinkCard } from "@/components/DrinkCard";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const dangerAnimation = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export default function AdminPage() {
  const router = useRouter();
  const { drinks, purchaseDrink, updateDrink } = useDrinkStore();
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [showCrashConfirm, setShowCrashConfirm] = useState(false);

  const handlePurchase = (drinkId: number) => {
    purchaseDrink(drinkId);
    const drink = drinks.find((d) => d.id === drinkId);
    toast.success(`${drink?.name} : Prix augmenté !`);
  };

  const handleCrashMarket = () => {
    setShowCrashConfirm(true);
    setTimeout(() => {
      if (window.confirm("⚠️ ATTENTION ⚠️\n\nVous êtes sur le point de déclencher un crash boursier !\nTous les prix seront réinitialisés à leur valeur de base.\n\nÊtes-vous absolument sûr de vouloir continuer ?")) {
        drinks.forEach(drink => {
          updateDrink(drink.id, {
            currentPrice: drink.basePrice,
            popularity: 0
          });
        });
        toast.error("💥 CRASH BOURSIER DÉCLENCHÉ ! 💥", {
          icon: <Skull className="w-5 h-5 text-red-500" />,
          duration: 5000,
          style: {
            background: 'rgba(220, 38, 38, 0.2)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#fff'
          },
        });
      }
      setShowCrashConfirm(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <Header />
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-xl mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-300">Administration des Prix</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Gestion des Prix en Direct
          </h1>
          <p className="text-purple-300/80">
            Contrôlez les prix des boissons en temps réel
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {drinks.map((drink) => (
            <motion.div
              key={drink.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`bg-black/40 border-purple-500/20 backdrop-blur-xl p-6 transition-all ${
                  selectedDrink === drink.id ? "ring-2 ring-purple-500" : ""
                }`}
                onClick={() => setSelectedDrink(drink.id)}
              >
                <DrinkCard drink={drink} />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    variant="default"
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(drink.id);
                    }}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Augmenter
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info(`${drink.name} : Le prix baissera naturellement avec le temps`);
                    }}
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Baisser
                  </Button>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="w-full justify-center bg-purple-500/10 text-purple-300 border-purple-500/30">
                    {drink.purchases} ventes totales
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            variants={dangerAnimation}
            initial="initial"
            whileHover="hover"
            className="relative"
          >
            <AnimatePresence>
              {showCrashConfirm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-red-500/20 text-red-300 px-4 py-2 rounded-full border border-red-500/30"
                >
                  ⚠️ Attention: Action Dangereuse ⚠️
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="destructive"
              onClick={handleCrashMarket}
              className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-red-500/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <Skull className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Déclencher un Crash Boursier
              <AlertTriangle className="w-6 h-6 ml-3 group-hover:animate-pulse" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}