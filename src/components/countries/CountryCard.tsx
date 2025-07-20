import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Country } from "../../types/country";

interface CountryCardProps {
  country: Country;
  index?: number;
}

function CountryCard({ country, index = 0 }: CountryCardProps) {
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
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer overflow-hidden h-80 flex flex-col"
          whileHover={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <motion.img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-32 object-cover rounded mb-3"
            whileHover={{ scale: 1.00 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h3
            className="text-lg font-semibold text-gray-900 mb-2 h-14 overflow-hidden leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(index * 0.02, 1) + 0.1 }}
          >
            {country.name.common}
          </motion.h3>
          <motion.div
            className="space-y-1 text-sm text-gray-600 flex-1"
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
              <span className="truncate block">{country.capital?.[0] || "N/A"}</span>
            </p>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default CountryCard;
