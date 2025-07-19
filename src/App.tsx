import Layout from './components/layout/Layout';
import CountryList from './components/countries/CountryList';

function App() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Countries App
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover information about countries around the world
          </p>
        </div>
        
        <CountryList />
      </div>
    </Layout>
  );
}

export default App;
