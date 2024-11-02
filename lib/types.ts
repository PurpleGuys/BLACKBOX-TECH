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

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'god' | 'admin' | 'user';
  licenses?: string[];
}

export interface DrinkHistory {
  id: string;
  drinkId: number;
  drinkName: string;
  price: number;
  quantity: number;
  timestamp: Date;
}

export interface Concept {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming_soon';
  icon: string;
}