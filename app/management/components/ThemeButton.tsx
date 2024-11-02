"use client";

import { Button } from "@/components/ui/button";

interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface ThemeButtonProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
}

export function ThemeButton({ theme, isSelected, onClick }: ThemeButtonProps) {
  return (
    <Button
      variant="outline"
      className={`h-auto p-4 bg-gradient-to-r ${theme.primary} border-none ${
        isSelected ? "ring-2 ring-purple-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="text-left">
        <h3 className="font-semibold text-white">{theme.name}</h3>
        <div className="flex gap-2 mt-2">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.primary}`} />
          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.secondary}`} />
        </div>
      </div>
    </Button>
  );
}