"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Beer, Plus, Trash2, Edit, DownloadCloud, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Drink } from "@/lib/types";
import { exportToExcel } from "@/utils/excel";
import { useDrinkStore } from "@/lib/store";

interface DrinkManagementProps {
  drinks: Drink[];
  onAddDrink: (name: string, icon: string, basePrice: number, minPrice: number, maxPrice: number) => void;
  onUpdateDrink: (id: number, updates: Partial<Drink>) => void;
  onRemoveDrink: (id: number) => void;
}

export function DrinkManagement({ drinks, onAddDrink, onUpdateDrink, onRemoveDrink }: DrinkManagementProps) {
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null);
  const { drinkHistory, resetDatabase } = useDrinkStore();

  const handleAddDrink = () => {
    if (!name || !basePrice || !minPrice || !maxPrice) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const basePriceNum = parseFloat(basePrice);
    const minPriceNum = parseFloat(minPrice);
    const maxPriceNum = parseFloat(maxPrice);

    if (minPriceNum >= maxPriceNum) {
      toast.error("Le prix minimum doit être inférieur au prix maximum");
      return;
    }

    if (basePriceNum < minPriceNum || basePriceNum > maxPriceNum) {
      toast.error("Le prix de base doit être compris entre le prix minimum et maximum");
      return;
    }

    onAddDrink(name, "Beer", basePriceNum, minPriceNum, maxPriceNum);
    setName("");
    setBasePrice("");
    setMinPrice("");
    setMaxPrice("");
    toast.success("Boisson ajoutée avec succès");
  };

  const handleUpdateDrink = () => {
    if (!editingDrink) return;

    const updates: Partial<Drink> = {
      name: name || editingDrink.name,
      basePrice: parseFloat(basePrice) || editingDrink.basePrice,
      minPrice: parseFloat(minPrice) || editingDrink.minPrice,
      maxPrice: parseFloat(maxPrice) || editingDrink.maxPrice,
    };

    onUpdateDrink(editingDrink.id, updates);
    setEditingDrink(null);
    setName("");
    setBasePrice("");
    setMinPrice("");
    setMaxPrice("");
    toast.success("Boisson mise à jour avec succès");
  };

  const handleExportHistory = () => {
    try {
      exportToExcel(drinkHistory);
      toast.success("Historique exporté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'exportation");
    }
  };

  const handleResetDatabase = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser la base de données ? Cette action est irréversible.")) {
      resetDatabase();
      toast.success("Base de données réinitialisée avec succès");
    }
  };

  return (
    <Card className="p-6 bg-black/40 border-purple-500/20">
      <div className="flex justify-between mb-6">
        <Button
          onClick={handleExportHistory}
          className="bg-green-600 hover:bg-green-700"
        >
          <DownloadCloud className="w-4 h-4 mr-2" />
          Exporter l'historique
        </Button>
        <Button
          onClick={handleResetDatabase}
          variant="destructive"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Réinitialiser la DB
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="name">Nom de la boisson</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-purple-950/50 border-purple-500/30"
          />
        </div>
        
        <div>
          <Label htmlFor="basePrice">Prix de base</Label>
          <Input
            id="basePrice"
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="bg-purple-950/50 border-purple-500/30"
          />
        </div>

        <div>
          <Label htmlFor="minPrice">Prix minimum</Label>
          <Input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-purple-950/50 border-purple-500/30"
          />
        </div>

        <div>
          <Label htmlFor="maxPrice">Prix maximum</Label>
          <Input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-purple-950/50 border-purple-500/30"
          />
        </div>

        <Button onClick={handleAddDrink} className="w-full bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une boisson
        </Button>
      </div>

      <div className="space-y-2">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className="flex items-center justify-between p-3 rounded-lg bg-purple-900/20 border border-purple-500/20"
          >
            <div className="flex items-center space-x-3">
              <Beer className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-purple-100">{drink.name}</p>
                <p className="text-sm text-purple-400">
                  Base: {drink.basePrice}€ | Min: {drink.minPrice}€ | Max: {drink.maxPrice}€
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingDrink(drink);
                      setName(drink.name);
                      setBasePrice(drink.basePrice.toString());
                      setMinPrice(drink.minPrice.toString());
                      setMaxPrice(drink.maxPrice.toString());
                    }}
                    className="text-purple-400 hover:text-purple-100 hover:bg-purple-800/50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-purple-500/20">
                  <DialogHeader>
                    <DialogTitle className="text-purple-300">Modifier la boisson</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="editName">Nom</Label>
                      <Input
                        id="editName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-purple-950/50 border-purple-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editBasePrice">Prix de base</Label>
                      <Input
                        id="editBasePrice"
                        type="number"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        className="bg-purple-950/50 border-purple-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editMinPrice">Prix minimum</Label>
                      <Input
                        id="editMinPrice"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="bg-purple-950/50 border-purple-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editMaxPrice">Prix maximum</Label>
                      <Input
                        id="editMaxPrice"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="bg-purple-950/50 border-purple-500/30"
                      />
                    </div>
                    <Button
                      onClick={handleUpdateDrink}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Mettre à jour
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveDrink(drink.id)}
                className="text-purple-400 hover:text-purple-100 hover:bg-purple-800/50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}