"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Drink, User, DrinkHistory, Concept } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface DrinkStore {
  drinks: Drink[];
  users: User[];
  drinkHistory: DrinkHistory[];
  currentUser: User | null;
  concepts: Concept[];
  updateDrinks: (drinks: Drink[]) => void;
  purchaseDrink: (drinkId: number) => void;
  addUser: (username: string, password: string, role: 'god' | 'admin' | 'user') => void;
  removeUser: (userId: string) => void;
  addDrink: (name: string, icon: string, basePrice: number, minPrice: number, maxPrice: number) => void;
  updateDrink: (id: number, updates: Partial<Drink>) => void;
  removeDrink: (drinkId: number) => void;
  resetDatabase: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  grantLicense: (userId: string, conceptId: string) => void;
  revokeLicense: (userId: string, conceptId: string) => void;
  hasLicense: (conceptId: string) => boolean;
}

const defaultGod: User = {
  id: "god-1",
  username: 'dieu',
  password: 'Paradis777@',
  role: 'god',
  licenses: ['all'],
};

const defaultAdmin: User = {
  id: "admin-1",
  username: 'PurpleGuy',
  password: 'Loulou150804@',
  role: 'admin',
  licenses: ['trading-bar'],
};

const initialDrinks: Drink[] = [
  {
    id: 1,
    name: "Bière Pression",
    icon: "Beer",
    basePrice: 5,
    minPrice: 3,
    maxPrice: 8,
    currentPrice: 5,
    popularity: 0,
    purchases: 0,
  },
  {
    id: 2,
    name: "Cocktail Maison",
    icon: "Cocktail",
    basePrice: 10,
    minPrice: 8,
    maxPrice: 15,
    currentPrice: 10,
    popularity: 0,
    purchases: 0,
  },
  {
    id: 3,
    name: "Verre de Vin",
    icon: "Wine",
    basePrice: 7,
    minPrice: 5,
    maxPrice: 12,
    currentPrice: 7,
    popularity: 0,
    purchases: 0,
  },
  {
    id: 4,
    name: "Café Spécial",
    icon: "Coffee",
    basePrice: 4,
    minPrice: 2,
    maxPrice: 6,
    currentPrice: 4,
    popularity: 0,
    purchases: 0,
  },
];

const initialConcepts: Concept[] = [
  {
    id: 'trading-bar',
    name: 'Trading Bar',
    description: 'Bar avec système de prix dynamiques basé sur la demande',
    status: 'active',
    icon: 'TrendingUp',
  },
  {
    id: 'mystery-box',
    name: 'Mystery Box',
    description: 'Concept de boîtes mystères avec des prix variables',
    status: 'coming_soon',
    icon: 'Box',
  },
  {
    id: 'auction-house',
    name: 'Auction House',
    description: 'Système d\'enchères en temps réel',
    status: 'coming_soon',
    icon: 'Gavel',
  },
];

export const useDrinkStore = create<DrinkStore>()(
  persist(
    (set, get) => ({
      drinks: initialDrinks,
      users: [defaultGod, defaultAdmin],
      drinkHistory: [],
      currentUser: null,
      concepts: initialConcepts,
      updateDrinks: (drinks) => set({ drinks }),
      purchaseDrink: (drinkId) => 
        set((state) => {
          const updatedDrinks = state.drinks.map((drink) => {
            if (drink.id === drinkId) {
              const newPurchases = drink.purchases + 1;
              const popularityIncrease = Math.min(0.5, (10 - drink.popularity) / 2);
              const newPopularity = Math.min(10, drink.popularity + popularityIncrease);
              const priceRange = drink.maxPrice - drink.minPrice;
              const popularityFactor = newPopularity / 10;
              const newPrice = drink.minPrice + (priceRange * popularityFactor);

              return {
                ...drink,
                purchases: newPurchases,
                popularity: Number(newPopularity.toFixed(1)),
                currentPrice: Number(newPrice.toFixed(2)),
              };
            }
            return drink;
          });

          const purchasedDrink = state.drinks.find(d => d.id === drinkId);
          if (purchasedDrink) {
            const historyEntry: DrinkHistory = {
              id: uuidv4(),
              drinkId,
              drinkName: purchasedDrink.name,
              price: purchasedDrink.currentPrice,
              quantity: 1,
              timestamp: new Date(),
            };

            return {
              drinks: updatedDrinks,
              drinkHistory: [...state.drinkHistory, historyEntry],
            };
          }

          return { drinks: updatedDrinks };
        }),
      addUser: (username, password, role) =>
        set((state) => ({
          users: [...state.users, { id: uuidv4(), username, password, role, licenses: [] }],
        })),
      removeUser: (userId) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId && user.id !== defaultGod.id),
        })),
      addDrink: (name, icon, basePrice, minPrice, maxPrice) =>
        set((state) => {
          const newId = Math.max(0, ...state.drinks.map((d) => d.id)) + 1;
          return {
            drinks: [
              ...state.drinks,
              {
                id: newId,
                name,
                icon,
                basePrice,
                minPrice,
                maxPrice,
                currentPrice: basePrice,
                popularity: 0,
                purchases: 0,
              },
            ],
          };
        }),
      updateDrink: (id, updates) =>
        set((state) => ({
          drinks: state.drinks.map((drink) =>
            drink.id === id
              ? { ...drink, ...updates }
              : drink
          ),
        })),
      removeDrink: (drinkId) =>
        set((state) => ({
          drinks: state.drinks.filter((drink) => drink.id !== drinkId),
        })),
      resetDatabase: () =>
        set((state) => ({
          drinks: state.drinks.map(drink => ({
            ...drink,
            currentPrice: drink.basePrice,
            popularity: 0,
            purchases: 0,
          })),
          drinkHistory: [],
        })),
      login: (username, password) => {
        const state = get();
        const user = state.users.find(
          (u) => u.username === username && u.password === password
        );
        
        if (user) {
          set({ currentUser: user });
          return true;
        }
        
        return false;
      },
      logout: () => set({ currentUser: null }),
      grantLicense: (userId, conceptId) => 
        set((state) => ({
          users: state.users.map((user) => 
            user.id === userId
              ? { 
                  ...user, 
                  licenses: [...new Set([...(user.licenses || []), conceptId])] 
                }
              : user
          ),
        })),
      revokeLicense: (userId, conceptId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? { 
                  ...user, 
                  licenses: (user.licenses || []).filter(id => id !== conceptId) 
                }
              : user
          ),
        })),
      hasLicense: (conceptId) => {
        const state = get();
        if (!state.currentUser) return false;
        if (state.currentUser.role === 'god') return true;
        return state.currentUser.licenses?.includes(conceptId) || false;
      },
    }),
    {
      name: 'drink-store',
      version: 4,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      onRehydrateStorage: () => {
        return (state) => {
          if (!state) return;
          
          // Ensure god user exists and is first in the list
          const godExists = state.users.some(
            user => user.username === defaultGod.username
          );
          
          if (!godExists) {
            state.users = [defaultGod, ...state.users];
          }

          // Ensure god can't be removed
          const godIndex = state.users.findIndex(
            user => user.username === defaultGod.username
          );
          if (godIndex > 0) {
            const god = state.users.splice(godIndex, 1)[0];
            state.users.unshift(god);
          }

          // Ensure all users have a licenses array
          state.users = state.users.map(user => ({
            ...user,
            licenses: user.licenses || [],
          }));

          // Ensure all concepts exist
          state.concepts = initialConcepts;
        };
      },
    }
  )
);