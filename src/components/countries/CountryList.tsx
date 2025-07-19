import type { Country } from '../../types/country';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

function CountryList({ countries, loading, error }: CountryListProps) {
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
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No countries found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {countries.map((country: Country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
