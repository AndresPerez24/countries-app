import { motion } from 'framer-motion';

interface FilterBarProps {
    selectedRegion: string;
    onRegionChange: (region: string) => void;
    sortField: 'name' | 'population';
    sortOrder: 'asc' | 'desc';
    onSortChange: (field: 'name' | 'population', order: 'asc' | 'desc') => void;
    regions: string[];
  }
  
  function FilterBar({ 
    selectedRegion, 
    onRegionChange, 
    sortField, 
    sortOrder, 
    onSortChange,
    regions 
  }: FilterBarProps) {
    return (
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Region
          </label>
          <div className="relative">
            <motion.select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </motion.select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg 
                className="h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          </div>
        </motion.div>
  
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <motion.select
                value={sortField}
                onChange={(e) => onSortChange(e.target.value as 'name' | 'population', sortOrder)}
                className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <option value="name">Name</option>
                <option value="population">Population</option>
              </motion.select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  className="h-4 w-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </div>
            </div>
            <motion.button
              onClick={() => onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <svg 
                className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 15l7-7 7 7" 
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
  
  export default FilterBar;
