'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Beat } from '@/types';

interface FavoritesContextType {
  favorites: Beat[];
  addFavorite: (beat: Beat) => void;
  removeFavorite: (beatId: string) => void;
  isFavorited: (beatId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Beat[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (beat: Beat) => {
    if (!favorites.find((b) => b.id === beat.id)) {
      setFavorites([...favorites, beat]);
    }
  };

  const removeFavorite = (beatId: string) => {
    setFavorites(favorites.filter((b) => b.id !== beatId));
  };

  const isFavorited = (beatId: string) => {
    return favorites.some((b) => b.id === beatId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorited,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
