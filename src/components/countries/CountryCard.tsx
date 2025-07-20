import { type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Country } from "../../types/country";
import { useFavorites } from "../../hooks/useFavorites";

interface CountryCardProps {
  country: Country;
  index?: number;
}

function CountryCard({ country, index = 0 }: CountryCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(country.name.common);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(country);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.02, 1),
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to={`/country/${encodeURIComponent(country.name.common)}`}
        className="block"
      >
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm cursor-pointer overflow-hidden h-64 flex flex-col relative"
          whileHover={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <motion.button
            onClick={handleFavoriteClick}
            className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Heart 
              className={`h-3.5 w-3.5 ${isCountryFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            />
          </motion.button>
          <motion.img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-24 object-cover rounded mb-2"
            whileHover={{ scale: 1.00 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h3
            className="text-base font-semibold text-gray-900 mb-1.5 h-10 overflow-hidden leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(index * 0.02, 1) + 0.1 }}
          >
            {country.name.common}
          </motion.h3>
          <motion.div
            className="space-y-0.5 text-xs text-gray-600 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(index * 0.02, 1) + 0.2 }}
          >
            <p>
              <span className="font-medium">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-medium">Capital:</span>{" "}
              <span className="truncate">{country.capital?.[0] || "N/A"}</span>
            </p>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default CountryCard;
