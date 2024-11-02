"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beer, Cocktail, Coffee, Wine } from "lucide-react";
import { Drink } from "@/types/drinks";

const icons = {
  Beer,
  Cocktail,
  Coffee,
  Wine,
} as const;

interface DrinkCardProps {
  drink: Drink;
  showPurchaseButton?: boolean;
  onPurchase?: (id: number) => void;
}

export function DrinkCard({ drink, showPurchaseButton = false, onPurchase }: DrinkCardProps) {
  const IconComponent = icons[drink.icon as keyof typeof icons];

  return (
    <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-primary">
            {IconComponent && <IconComponent className="w-8 h-8" />}
          </div>
          <Badge 
            variant={drink.currentPrice > drink.basePrice ? "destructive" : "default"}
            className="text-xs"
          >
            Popularité: {drink.popularity.toFixed(1)}/10
          </Badge>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">{drink.name}</h2>
        
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-primary">
            {drink.currentPrice.toFixed(2)} €
          </div>
          <div className="text-xs text-zinc-400">
            Prix de base: {drink.basePrice.toFixed(2)} €
          </div>
          <div className="text-xs text-zinc-500">
            Min: {drink.minPrice}€ | Max: {drink.maxPrice}€
          </div>
          {showPurchaseButton && (
            <button
              onClick={() => onPurchase?.(drink.id)}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
            >
              Commander
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}