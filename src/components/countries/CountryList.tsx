import { useState, useEffect, useMemo } from 'react';
import type { Country } from '../../types/country';
import { fetchCountries } from '../../utils/api';
import { sortCountries, filterByRegion, filterBySearch, getUniqueRegions } from '../../utils/countryUtils';
import CountryCard from './CountryCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

function CountryList() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortField, setSortField] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCountries();
      setAllCountries(data);
    } catch (err) {
      setError('Failed to load countries. Please try again.');
      console.error('Error loading countries:', err);
    } finally {
      setLoading(false);
    }
  };

  const regions = useMemo(() => {
    return getUniqueRegions(allCountries);
  }, [allCountries]);

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = allCountries;

    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm);
    }

    if (selectedRegion) {
      filtered = filterByRegion(filtered, selectedRegion);
    }

    filtered = sortCountries(filtered, sortField, sortOrder);

    return filtered;
  }, [allCountries, searchTerm, selectedRegion, sortField, sortOrder]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSortChange = (field: 'name' | 'population', order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
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
      
      <FilterBar
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        regions={regions}
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAndSortedCountries.length} of {allCountries.length} countries
      </div>
      
      {filteredAndSortedCountries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No countries found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('');
            }}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCountries.map((country: Country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryList;
