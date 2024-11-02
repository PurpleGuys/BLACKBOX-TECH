"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Drink } from "@/lib/types";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

interface DrinkCardProps {
  drink: Drink;
}

export function DrinkCard({ drink }: DrinkCardProps) {
  const Icon = Icons[drink.icon as IconName] || Icons.Beer;

  return (
    <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-purple-400">
            <Icon className="w-8 h-8" />
          </div>
          <Badge 
            variant={drink.currentPrice > drink.basePrice ? "destructive" : "default"}
            className="text-xs bg-purple-500/20 text-purple-300"
          >
            Popularité: {drink.popularity.toFixed(1)}/10
          </Badge>
        </div>
        
        <h2 className="text-xl font-semibold mb-2 text-purple-100">{drink.name}</h2>
        
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-purple-400">
            {drink.currentPrice.toFixed(2)} €
          </div>
          <div className="text-xs text-purple-500">
            Prix de base: {drink.basePrice.toFixed(2)} €
          </div>
          <div className="text-xs text-purple-600">
            Min: {drink.minPrice}€ | Max: {drink.maxPrice}€
          </div>
        </div>
      </div>
    </Card>
  );
}