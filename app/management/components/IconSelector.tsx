"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";

const AVAILABLE_ICONS = [
  "GlassWater",
  "Beer",
  "Wine",
  "Cocktail",
  "Coffee",
  "Store",
  "PartyPopper",
  "Sparkles",
  "Star",
  "Heart"
];

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

export function IconSelector({ selectedIcon, onSelectIcon }: IconSelectorProps) {
  const [search, setSearch] = useState("");

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    if (!Icon) return null;
    
    return (
      <Button
        key={iconName}
        variant={selectedIcon === iconName ? "default" : "ghost"}
        className="flex flex-col items-center gap-2 p-4 hover:bg-purple-500/20"
        onClick={() => onSelectIcon(iconName)}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs">{iconName}</span>
      </Button>
    );
  };

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border border-purple-500/20 bg-purple-950/50">
      <div className="grid grid-cols-4 gap-2 p-4">
        {AVAILABLE_ICONS.map(renderIcon)}
      </div>
    </ScrollArea>
  );
}