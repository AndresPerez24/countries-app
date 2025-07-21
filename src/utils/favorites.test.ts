import {
  getFavorites,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  getFavoritesCount
} from './favorites';

describe('Favorites Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty array when no favorites exist', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('should return stored favorites', () => {
    const mockFavorites = ['United States', 'France'];
    localStorage.setItem('countries-favorites', JSON.stringify(mockFavorites));
    
    expect(getFavorites()).toEqual(mockFavorites);
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem('countries-favorites', 'invalid-json');
    
    expect(getFavorites()).toEqual([]);
  });

  it('should add country to favorites', () => {
    addToFavorites('France');
    
    expect(getFavorites()).toEqual(['France']);
  });

  it('should not add duplicate countries', () => {
    addToFavorites('France');
    addToFavorites('France');
    
    expect(getFavorites()).toEqual(['France']);
  });

  it('should remove country from favorites', () => {
    addToFavorites('France');
    addToFavorites('Japan');
    removeFromFavorites('France');
    
    expect(getFavorites()).toEqual(['Japan']);
  });

  it('should toggle favorite correctly', () => {
    toggleFavorite('France');
    expect(isFavorite('France')).toBe(true);
    
    toggleFavorite('France');
    expect(isFavorite('France')).toBe(false);
  });

  it('should return correct favorites count', () => {
    expect(getFavoritesCount()).toBe(0);
    
    addToFavorites('France');
    addToFavorites('Japan');
    
    expect(getFavoritesCount()).toBe(2);
  });
}); 