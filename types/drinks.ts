import { ReactNode } from 'react';

export interface Drink {
  id: number;
  name: string;
  icon: string;
  basePrice: number;
  minPrice: number;
  maxPrice: number;
  currentPrice: number;
  popularity: number;
  purchases: number;
}