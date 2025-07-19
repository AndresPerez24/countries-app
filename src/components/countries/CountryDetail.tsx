import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Country } from '../../types/country';
import { fetchCountries } from '../../utils/api';

function CountryDetail() {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryName) return;
    
    const loadCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        const countries = await fetchCountries();
        const decodedCountryName = decodeURIComponent(countryName);
        const foundCountry = countries.find(
          c => c.name.common.toLowerCase() === decodedCountryName.toLowerCase()
        );
        
        if (foundCountry) {
          setCountry(foundCountry);
        } else {
          setError('Country not found');
        }
      } catch (err) {
        setError('Failed to load country details');
        console.error('Error loading country:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [countryName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error || 'Country not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Countries
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-700"
      >
        ← Back to Countries
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {country.name.common}
            </h1>
            
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700">Population:</span>
                <span className="ml-2 text-gray-900">
                  {country.population.toLocaleString()}
                </span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Region:</span>
                <span className="ml-2 text-gray-900">{country.region}</span>
              </div>
              
              {country.capital && country.capital.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-700">Capital:</span>
                  <span className="ml-2 text-gray-900">
                    {country.capital.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
