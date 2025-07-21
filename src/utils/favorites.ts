const FAVORITES_KEY = 'countries-favorites';

export const getFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: string[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (countryName: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(countryName);
};

export const addToFavorites = (countryName: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(countryName)) {
    favorites.push(countryName);
    saveFavorites(favorites);
  }
};

export const removeFromFavorites = (countryName: string): void => {
  const favorites = getFavorites();
  const filtered = favorites.filter(name => name !== countryName);
  saveFavorites(filtered);
};

export const toggleFavorite = (countryName: string): void => {
  if (isFavorite(countryName)) {
    removeFromFavorites(countryName);
  } else {
    addToFavorites(countryName);
  }
};

export const getFavoritesCount = (): number => {
  return getFavorites().length;
};
