import { useState, useMemo, type FC } from "react";
import SearchBar from "../components/countries/SearchBar";
import FilterBar from "../components/countries/FilterBar";
import CountryList from "../components/countries/CountryList";
import { useCountries } from "../hooks/useCountries";
import {
  filterBySearch,
  filterByRegion,
  sortCountries,
  getUniqueRegions
} from "../utils/countryUtils";

const HomePage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortField, setSortField] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { countries, loading, error } = useCountries();

  const regions = useMemo(() => {
    return getUniqueRegions(countries);
  }, [countries]);

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm);
    }

    if (selectedRegion) {
      filtered = filterByRegion(filtered, selectedRegion);
    }

    filtered = sortCountries(filtered, sortField, sortOrder);

    return filtered;
  }, [countries, searchTerm, selectedRegion, sortField, sortOrder]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explore Countries
        </h1>
        <p className="text-gray-600">
          Discover countries around the world with detailed information and beautiful flags.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <SearchBar
          onSearch={handleSearch}
        />

        <FilterBar
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          regions={regions}
        />
      </div>

      {!loading && !error && (
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedCountries.length} of {countries.length} countries
          </p>
        </div>
      )}

      <CountryList
        countries={filteredAndSortedCountries}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default HomePage;
