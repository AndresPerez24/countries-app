import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { 
  getFavorites, 
  isFavorite, 
  toggleFavorite,
  getFavoritesCount 
} from '../utils/favorites';

export const useFavorites = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    setFavoritesCount(getFavoritesCount());
  }, []);

  const handleToggleFavorite = (country: Country) => {
    toggleFavorite(country.name.common);
    setFavoritesCount(getFavoritesCount());
  };

  const checkIsFavorite = (countryName: string) => {
    return isFavorite(countryName);
  };

  const getAllFavorites = () => {
    return getFavorites();
  };

  return {
    favoritesCount,
    toggleFavorite: handleToggleFavorite,
    isFavorite: checkIsFavorite,
    getFavorites: getAllFavorites
  };
};
