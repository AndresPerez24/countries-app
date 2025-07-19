import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Users, Ruler } from 'lucide-react';
import { Button, Card } from '../ui';
import type { Country } from '../../types/country';
import { fetchCountryByName } from '../../utils/api';
import { 
  formatPopulation, 
  formatArea, 
  formatCurrencies, 
  formatLanguages,
  formatCapital 
} from '../../utils/countryUtils';

interface CountryDetailProps {
  country?: Country | null;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ 
  country: propCountry, 
  loading: propLoading = false, 
  error: propError = null,
  className 
}) => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(propCountry || null);
  const [loading, setLoading] = useState(propLoading);
  const [error, setError] = useState<string | null>(propError);

  useEffect(() => {
    if (propCountry) {
      setCountry(propCountry);
      return;
    }

    if (!countryName) return;
    
    const loadCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        const foundCountry = await fetchCountryByName(countryName);
        setCountry(foundCountry);
      } catch (err) {
        setError('Failed to load country details');
        console.error('Error loading country:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [countryName, propCountry]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading country</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Country not found</h3>
          <p className="text-gray-600 mb-4">The country you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-8">
        <Link to="/">
          <Button variant="outline" className="flex items-center space-x-2 hover:bg-gray-50">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Countries</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Flag */}
        <div className="space-y-6">
          <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Country Information */}
        <div className="space-y-8">
          {/* Basic Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {country.name.common}
            </h1>
            {country.name.official && (
              <p className="text-lg text-gray-600 mb-6">
                {country.name.official}
              </p>
            )}
          </div>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Population</p>
                    <p className="font-semibold">{formatPopulation(country.population)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Ruler className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">{country.area ? formatArea(country.area) : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Capital</p>
                    <p className="font-semibold">{formatCapital(country.capital)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-semibold">{country.region}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subregion:</span>
                    <span className="font-medium">{country.subregion || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currencies:</span>
                    <span className="font-medium">{formatCurrencies(country.currencies)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <span className="font-medium">{formatLanguages(country.languages)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {country.borders && country.borders.length > 0 && (
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Border Countries</h3>
                  <div className="flex flex-wrap gap-2">
                    {country.borders.map((border) => (
                      <span
                        key={border}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      >
                        {border}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
