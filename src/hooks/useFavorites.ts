import { useLocalStorage } from "usehooks-ts";
import type { Country } from "../types/country";

const FAVORITES_KEY = "countries-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    FAVORITES_KEY,
    []
  );

  const toggleFavorite = (country: Country) => {
    const countryName = country.name.common;
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(countryName)) {
        return prevFavorites.filter((name) => name !== countryName);
      } else {
        return [...prevFavorites, countryName];
      }
    });
  };

  const isFavorite = (countryName: string): boolean => {
    return favorites.includes(countryName);
  };

  const getFavorites = (): string[] => {
    return favorites;
  };

  const favoritesCount = favorites.length;

  return {
    favoritesCount,
    toggleFavorite,
    isFavorite,
    getFavorites,
  };
};
