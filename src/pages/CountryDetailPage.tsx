import { type FC } from 'react';
import CountryDetail from '../components/countries/CountryDetail';

const CountryDetailPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CountryDetail />
    </div>
  );
};

export default CountryDetailPage; 