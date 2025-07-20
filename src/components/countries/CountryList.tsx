import { motion } from "framer-motion";
import type { Country } from "../../types/country";
import CountryCard from "./CountryCard";
import { ClipLoader } from "react-spinners";
import { XCircle, SearchX } from "lucide-react";

interface CountryListProps {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

function CountryList({ countries, loading, error }: CountryListProps) {
  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <ClipLoader
            size={32}
            color="#3b82f6"
            loading={true}
            speedMultiplier={0.8}
            className="mx-auto mb-4"
          />
          <p className="text-gray-600">Loading countries...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <XCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error loading countries
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Refresh Page
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (countries.length === 0) {
    return (
      <motion.div
        className="flex justify-center items-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <SearchX className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No countries found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {countries.map((country: Country, index: number) => (
        <CountryCard
          key={country.name.common}
          country={country}
          index={index}
        />
      ))}
    </motion.div>
  );
}

export default CountryList;
