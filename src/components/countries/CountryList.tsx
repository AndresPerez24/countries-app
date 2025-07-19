import { useState, useEffect } from 'react';
import type { Country } from '../../types/country';
import { fetchCountries, searchCountries } from '../../utils/api';
import CountryCard from './CountryCard';
import SearchBar from './SearchBar';

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

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

  const handleSearch = async (query: string) => {
    if (query.length === 0) {
      loadCountries();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchCountries(query);
      setCountries(data);
    } catch {
      setError('No countries found. Please try a different search.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadCountries}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      {countries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No countries found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryList; 