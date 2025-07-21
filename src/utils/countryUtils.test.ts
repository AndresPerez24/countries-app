import {
  sortCountries,
  filterByRegion,
  filterBySearch,
  formatPopulation,
  formatCurrencies
} from './countryUtils';
import type { Country } from '../types/country';

const createCountry = (overrides: Partial<Country> = {}): Country => ({
  name: {
    common: 'Test Country',
    official: 'Official Test Country'
  },
  flags: {
    png: 'test-flag.png',
    svg: 'test-flag.svg',
    alt: 'Test flag'
  },
  population: 1000000,
  region: 'Test Region',
  subregion: 'Test Subregion',
  capital: ['Test Capital'],
  area: 100000,
  currencies: {
    USD: { name: 'US Dollar', symbol: '$' }
  },
  languages: {
    en: 'English'
  },
  ...overrides
});

describe('Country Utilities', () => {
  const countries = [
    createCountry({ 
      name: { common: 'france', official: 'French Republic' }, 
      population: 67000000, 
      region: 'Europe' 
    }),
    createCountry({ 
      name: { common: 'germany', official: 'Federal Republic of Germany' }, 
      population: 83000000, 
      region: 'Europe' 
    }),
    createCountry({ 
      name: { common: 'japan', official: 'Japan' }, 
      population: 125000000, 
      region: 'Asia' 
    }),
  ];

  it('should sort countries by name', () => {
    const result = sortCountries(countries, 'name', 'asc');
    
    expect(result[0].name.common).toBe('france');
    expect(result[1].name.common).toBe('germany');
    expect(result[2].name.common).toBe('japan');
  });

  it('should sort countries by population', () => {
    const result = sortCountries(countries, 'population', 'desc');
    
    expect(result[0].population).toBe(125000000);
    expect(result[1].population).toBe(83000000);
    expect(result[2].population).toBe(67000000);
  });

  it('should handle invalid population values', () => {
    const testCountries = [
      createCountry({ population: 0 }),
      createCountry({ population: NaN }),
      createCountry({ population: 1000000 })
    ];

    const result = sortCountries(testCountries, 'population', 'asc');
    
    expect(result[0].population).toBe(0);
    expect(result[2].population).toBe(1000000);
  });

  it('should filter countries by region', () => {
    const result = filterByRegion(countries, 'Europe');
    
    expect(result).toHaveLength(2);
    expect(result[0].name.common).toBe('france');
    expect(result[1].name.common).toBe('germany');
  });

  it('should filter by search term', () => {
    const result = filterBySearch(countries, 'france');
    
    expect(result).toHaveLength(1);
    expect(result[0].name.common).toBe('france');
  });

  it('should format population with separators', () => {
    expect(formatPopulation(1234567)).toBe('1,234,567');
  });

  it('should format currencies correctly', () => {
    const currencies = { USD: { name: 'US Dollar', symbol: '$' } };
    expect(formatCurrencies(currencies)).toBe('US Dollar ($)');
    expect(formatCurrencies(undefined)).toBe('N/A');
  });
}); 