import { type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Users, Ruler, Heart } from 'lucide-react';
import { Button, Card } from '../ui';
import { useFavorites, useCountryQuery } from '../../hooks';
import type { Country } from '../../types/country';
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

const CountryDetail: FC<CountryDetailProps> = ({ 
  country: propCountry, 
  loading: propLoading = false, 
  error: propError = null,
  className 
}) => {
  const { countryName } = useParams<{ countryName: string }>();
  const { data: country, isLoading, error } = useCountryQuery(countryName || '');
  const { toggleFavorite, isFavorite } = useFavorites();

  const displayCountry = propCountry || country;
  const displayLoading = propLoading || isLoading;
  const displayError = propError || (error instanceof Error ? error.message : null);

  const handleFavoriteClick = () => {
    if (displayCountry) {
      toggleFavorite(displayCountry);
    }
  };

  if (displayLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading country</h3>
          <p className="text-gray-600 mb-4">{displayError}</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!displayCountry) {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={displayCountry.flags.svg || displayCountry.flags.png}
              alt={displayCountry.flags.alt || `Flag of ${displayCountry.name.common}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {displayCountry.name.common}
              </h1>
              <button
                onClick={handleFavoriteClick}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart 
                  className={`h-6 w-6 ${isFavorite(displayCountry.name.common) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                />
              </button>
            </div>
            {displayCountry.name.official && (
              <p className="text-lg text-gray-600 mb-6">
                {displayCountry.name.official}
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
                    <p className="font-semibold">{formatPopulation(displayCountry.population)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Ruler className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">{displayCountry.area ? formatArea(displayCountry.area) : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Capital</p>
                    <p className="font-semibold">{formatCapital(displayCountry.capital)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-semibold">{displayCountry.region}</p>
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
                    <span className="font-medium">{displayCountry.subregion || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currencies:</span>
                    <span className="font-medium">{formatCurrencies(displayCountry.currencies)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <span className="font-medium">{formatLanguages(displayCountry.languages)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {displayCountry.borders && displayCountry.borders.length > 0 && (
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Border Countries</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayCountry.borders.map((border: string) => (
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
