import { orderBy } from 'lodash';
import type { Country } from '../types/country';

export const sortCountries = (
  countries: Country[], 
  field: 'name' | 'population', 
  order: 'asc' | 'desc' = 'asc'
): Country[] => {
  const sortKey = field === 'name' ? 'name.common' : 'population';
  return orderBy(countries, [sortKey], [order]);
};

export const filterByRegion = (countries: Country[], region: string): Country[] => {
  if (!region) return countries;
  return countries.filter(country => country.region.toLowerCase() === region.toLowerCase());
};

export const filterBySearch = (countries: Country[], searchTerm: string): Country[] => {
  if (!searchTerm.trim()) return countries;
  
  const term = searchTerm.toLowerCase().trim();
  return countries.filter(country => 
    country.name.common.toLowerCase().includes(term) ||
    country.region.toLowerCase().includes(term) ||
    (country.capital && country.capital[0]?.toLowerCase().includes(term))
  );
};

export const getUniqueRegions = (countries: Country[]): string[] => {
  const regions = countries.map(country => country.region);
  return [...new Set(regions)].sort();
};
