import { useState, useMemo, type FC } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/countries/SearchBar";
import FilterBar from "../components/countries/FilterBar";
import CountryList from "../components/countries/CountryList";
import { useCountriesData, useFavorites } from "../hooks";
import { getUniqueRegions } from "../utils/countryUtils";

const HomePage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortField, setSortField] = useState<"name" | "population">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  const { getFavorites, favoritesCount } = useFavorites();
  const favoriteNames = getFavorites();

  const { data: countries, isLoading: loading, error } = useCountriesData({
    searchTerm,
    selectedRegion,
    sortField,
    sortOrder,
    activeTab,
    favoriteNames,
  });

  const regions = useMemo(() => {
    return getUniqueRegions(countries);
  }, [countries]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSortChange = (
    field: "name" | "population",
    order: "asc" | "desc"
  ) => {
    setSortField(field);
    setSortOrder(order);
  };

  const errorMessage = error instanceof Error ? error.message : 'Failed to load countries. Please try again.';

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Explore Countries
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover countries around the world with detailed information.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            All Countries
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "favorites"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Favorites {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="space-y-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <SearchBar onSearch={handleSearch} />

        <FilterBar
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          regions={regions}
        />
      </motion.div>

      {activeTab === "favorites" && favoritesCount === 0 && !loading ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-400 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Favorites Yet</h3>
          <p className="text-gray-600 mb-4">Start exploring countries and click the heart icon to add them to your favorites!</p>
          <button
            onClick={() => setActiveTab("all")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Browse Countries
          </button>
        </motion.div>
      ) : (
        <CountryList
          countries={countries}
          loading={loading}
          error={error ? errorMessage : null}
        />
      )}
    </motion.div>
  );
};

export default HomePage;
