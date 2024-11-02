"use client";

import { useState } from "react";
import { useDrinkStore } from "@/lib/store";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Beer, ShoppingCart, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

export default function PurchasePage() {
  const { drinks, purchaseDrink } = useDrinkStore();
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);

  const handlePurchase = (drinkId: number) => {
    purchaseDrink(drinkId);
    const drink = drinks.find((d) => d.id === drinkId);
    toast.success(`${drink?.name} commandé avec succès !`, {
      icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
    });
  };

  // Trier les boissons par popularité
  const sortedDrinks = [...drinks].sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <Header />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-xl mb-4"
          >
            <ShoppingCart className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-300">Commander des Boissons</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
          >
            Menu des Boissons
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-purple-300/80"
          >
            Les prix évoluent en temps réel selon la demande
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedDrinks.map((drink) => (
            <motion.div key={drink.id} variants={item}>
              <Card
                className={`group bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:bg-purple-900/20 transition-all duration-500 overflow-hidden ${
                  selectedDrink === drink.id ? "ring-2 ring-purple-500" : ""
                }`}
                onClick={() => setSelectedDrink(drink.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Beer className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-purple-100">
                        {drink.name}
                      </h3>
                    </div>
                    <Badge
                      variant={drink.currentPrice > drink.basePrice ? "destructive" : "default"}
                      className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {((drink.popularity / 10) * 100).toFixed(0)}% popularité
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-purple-100 mb-2">
                      {drink.currentPrice.toFixed(2)} €
                    </div>
                    <div className="text-sm text-purple-400">
                      Prix de base: {drink.basePrice.toFixed(2)} €
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
                        style={{ width: `${(drink.popularity / 10) * 100}%` }}
                      />
                    </div>

                    <Button
                      onClick={() => handlePurchase(drink.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-500/30 transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Commander
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}