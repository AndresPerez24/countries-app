import { uniq, sortBy, isEmpty } from 'lodash';
import type { Country } from '../types/country';

export const formatPopulation = (population: number): string => {
  return population.toLocaleString();
};

export const formatArea = (area: number): string => {
  return `${area.toLocaleString()} km²`;
};

export const formatCurrencies = (currencies: Record<string, { name: string; symbol: string }> | undefined): string => {
  if (!currencies || isEmpty(currencies)) return 'N/A';
  
  const currencyStrings = Object.values(currencies).map((currency) => 
    `${currency.name} (${currency.symbol})`
  );
  
  return currencyStrings.join(', ');
};

export const formatLanguages = (languages: Record<string, string> | undefined): string => {
  if (!languages || isEmpty(languages)) return 'N/A';
  return Object.values(languages).join(', ');
};

export const formatCapital = (capital: string[] | undefined): string => {
  if (!capital || isEmpty(capital)) return 'N/A';
  return capital.join(', ');
};

export const filterBySearch = (countries: Country[], searchTerm: string): Country[] => {
  if (!searchTerm.trim()) return countries;
  
  const searchLower = searchTerm.toLowerCase();
  
  return countries.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(searchLower);
    const regionMatch = country.region.toLowerCase().includes(searchLower);
    const capitalMatch = country.capital && country.capital.some((cap) => 
      cap.toLowerCase().includes(searchLower)
    );
    
    return nameMatch || regionMatch || capitalMatch;
  });
};

export const filterByRegion = (countries: Country[], region: string): Country[] => {
  if (!region) return countries;
  return countries.filter((country) => country.region === region);
};

export const sortCountries = (
  countries: Country[], 
  field: 'name' | 'population', 
  order: 'asc' | 'desc'
): Country[] => {
  return [...countries].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (field === 'name') {
      aValue = a.name.common.toLowerCase();
      bValue = b.name.common.toLowerCase();
    } else {
      aValue = a.population;
      bValue = b.population;
    }

    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

export const getUniqueRegions = (countries: Country[]): string[] => {
  const regions = countries.map(country => country.region);
  return sortBy(uniq(regions));
};
