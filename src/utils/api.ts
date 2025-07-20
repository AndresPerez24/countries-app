import type { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

const fetchWithRetry = async (url: string, retries: number = RETRY_ATTEMPTS): Promise<Country[]> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed:`, error);

      if (i === retries - 1) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch data after ${retries} attempts: ${error.message}`);
        }
        throw new Error(`Failed to fetch data after ${retries} attempts`);
      }
      
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
    }
  }

  throw new Error('Unexpected error in fetchWithRetry');
};

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    return await fetchWithRetry(`${BASE_URL}/all?fields=name,flags,population,region,capital`);
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Unable to load countries. Please check your internet connection and try again.');
  }
};

export const searchCountries = async (name: string): Promise<Country[]> => {
  if (!name || name.trim().length === 0) {
    throw new Error('Please enter a country name to search');
  }
  
  try {
    return await fetchWithRetry(`${BASE_URL}/name/${encodeURIComponent(name)}?fields=name,flags,population,region,capital`);
  } catch (error) {
    console.error('Error searching countries:', error);
    if (error instanceof Error && error.message.includes('HTTP 404')) {
      throw new Error(`No countries found matching "${name}"`);
    }
    throw new Error('Unable to search countries. Please try again.');
  }
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  if (!region || region.trim().length === 0) {
    throw new Error('Please select a region');
  }
  
  try {
    return await fetchWithRetry(`${BASE_URL}/region/${encodeURIComponent(region)}?fields=name,flags,population,region,capital`);
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    if (error instanceof Error && error.message.includes('HTTP 404')) {
      throw new Error(`No countries found in region "${region}"`);
    }
    throw new Error(`Unable to load countries for region "${region}". Please try again.`);
  }
};

export const fetchCountryByName = async (name: string): Promise<Country> => {
  if (!name || name.trim().length === 0) {
    throw new Error('Country name is required');
  }
  
  try {
    const countries = await fetchWithRetry(`${BASE_URL}/name/${encodeURIComponent(name)}?fields=name,flags,population,region,capital,area,languages,currencies,borders,timezones&fullText=true`);
    
    if (!countries || countries.length === 0) {
      throw new Error(`Country "${name}" not found`);
    }
    
    return countries[0];
  } catch (error) {
    console.error('Error fetching country details:', error);
    if (error instanceof Error && error.message.includes('HTTP 404')) {
      throw new Error(`Country "${name}" not found`);
    }
    throw new Error(`Unable to load details for "${name}". Please try again.`);
  }
};