import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { fetchCountries } from '../utils/api';

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCountries = (): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCountries();
      setCountries(data);
    } catch (err) {
      setError('Failed to load countries. Please try again.');
      console.error('Error loading countries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const refetch = () => {
    loadCountries();
  };

  return {
    countries,
    loading,
    error,
    refetch
  };
}; 