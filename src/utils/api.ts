import type { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/all?fields=name,flags,population,region,capital`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};

export const searchCountries = async (name: string): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/name/${name}?fields=name,flags,population,region,capital`);
  if (!response.ok) {
    throw new Error('Failed to search countries');
  }
  return response.json();
}; 