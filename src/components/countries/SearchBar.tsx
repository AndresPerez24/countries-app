import { useState, useEffect, type FC, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? "#3b82f6" : "#6b7280",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
            <Input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 w-full shadow-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;
