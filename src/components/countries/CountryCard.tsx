import { Link } from 'react-router-dom';
import type { Country } from '../../types/country';

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <Link 
      to={`/country/${encodeURIComponent(country.name.common)}`}
      className="block"
    >
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          className="w-full h-32 object-cover rounded mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {country.name.common}
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-medium">Region:</span> {country.region}</p>
          <p><span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
