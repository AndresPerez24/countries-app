import type { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

const BASIC_FIELDS = 'name,flags,population,region,capital';

const DETAILED_FIELDS = 'name,flags,population,region,subregion,capital,area,currencies,languages,tld,borders';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=${BASIC_FIELDS}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries.');
  }
};

export const fetchCountryByName = async (name: string): Promise<Country> => {
  try {
    const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true&fields=${DETAILED_FIELDS}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Country not found');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const countries = await response.json();
    if (!countries || countries.length === 0) {
      throw new Error('Country not found');
    }
    return countries[0];
  } catch (error) {
    console.error('Error fetching country:', error);
    if (error instanceof Error && error.message === 'Country not found') {
      throw error;
    }
    throw new Error('Failed to fetch country details. Please try again.');
  }
};

export const searchCountries = async (name: string): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fields=${BASIC_FIELDS}`);
  if (!response.ok) {
    throw new Error('Failed to search countries');
  }
  return response.json();
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/region/${encodeURIComponent(region)}?fields=${BASIC_FIELDS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries for region');
  }
  return response.json();
}; 