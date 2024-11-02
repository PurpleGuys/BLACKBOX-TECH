"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/lib/themeStore";
import { motion } from "framer-motion";
import { Palette, Check, Settings } from "lucide-react";
import { toast } from "sonner";
import { IconSelector } from "./IconSelector";

const themes = [
  { value: "purple", label: "Violet" },
  { value: "blue", label: "Bleu" },
  { value: "emerald", label: "Émeraude" },
];

const cardStyles = [
  { value: "minimal", label: "Minimal" },
  { value: "gradient", label: "Dégradé" },
  { value: "glass", label: "Verre" },
];

const animationSpeeds = [
  { value: "slow", label: "Lente" },
  { value: "normal", label: "Normale" },
  { value: "fast", label: "Rapide" },
];

export function DisplayCustomization() {
  const store = useThemeStore();
  const currentTheme = store.getCurrentTheme();

  const [formState, setFormState] = useState({
    title: '',
    subtitle: '',
    marquee: '',
    icon: '',
  });

  useEffect(() => {
    setFormState({
      title: store.displayTitle,
      subtitle: store.displaySubtitle,
      marquee: store.marqueeText,
      icon: store.logoIcon,
    });
  }, [store.displayTitle, store.displaySubtitle, store.marqueeText, store.logoIcon]);

  const handleSave = () => {
    store.setDisplayTitle(formState.title);
    store.setDisplaySubtitle(formState.subtitle);
    store.setMarqueeText(formState.marquee);
    store.setLogoIcon(formState.icon);
    toast.success("Personnalisation sauvegardée");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Apparence générale */}
      <Card className="p-6 bg-black/40 border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Palette className="text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-purple-200">
            Apparence générale
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="theme">Thème</Label>
            <Select 
              value={store.currentTheme} 
              onValueChange={store.setTheme}
            >
              <SelectTrigger className="bg-black/40 border-purple-500/20">
                <SelectValue placeholder="Sélectionner un thème" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cardStyle">Style des cartes</Label>
            <Select 
              value={store.cardStyle} 
              onValueChange={store.setCardStyle}
            >
              <SelectTrigger className="bg-black/40 border-purple-500/20">
                <SelectValue placeholder="Sélectionner un style" />
              </SelectTrigger>
              <SelectContent>
                {cardStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="animationSpeed">Vitesse des animations</Label>
            <Select 
              value={store.animationSpeed} 
              onValueChange={store.setAnimationSpeed}
            >
              <SelectTrigger className="bg-black/40 border-purple-500/20">
                <SelectValue placeholder="Sélectionner une vitesse" />
              </SelectTrigger>
              <SelectContent>
                {animationSpeeds.map((speed) => (
                  <SelectItem key={speed.value} value={speed.value}>
                    {speed.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showRevenue">Afficher les revenus totaux</Label>
            <Switch
              id="showRevenue"
              checked={store.showTotalRevenue}
              onCheckedChange={store.setShowTotalRevenue}
            />
          </div>
        </div>
      </Card>

      {/* Contenu textuel */}
      <Card className="p-6 bg-black/40 border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Settings className="text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-purple-200">
            Contenu textuel
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Titre principal</Label>
            <Input
              id="title"
              value={formState.title}
              onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
              className="bg-black/40 border-purple-500/20"
              placeholder="Titre principal"
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input
              id="subtitle"
              value={formState.subtitle}
              onChange={(e) => setFormState(prev => ({ ...prev, subtitle: e.target.value }))}
              className="bg-black/40 border-purple-500/20"
              placeholder="Sous-titre"
            />
          </div>

          <div>
            <Label htmlFor="marquee">Texte défilant</Label>
            <Input
              id="marquee"
              value={formState.marquee}
              onChange={(e) => setFormState(prev => ({ ...prev, marquee: e.target.value }))}
              className="bg-black/40 border-purple-500/20"
              placeholder="Texte défilant"
            />
          </div>

          <div>
            <Label>Icône</Label>
            <IconSelector
              selectedIcon={formState.icon}
              onSelectIcon={(icon) => setFormState(prev => ({ ...prev, icon }))}
            />
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
          >
            <Check className="w-4 h-4 mr-2" />
            Sauvegarder les modifications
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}