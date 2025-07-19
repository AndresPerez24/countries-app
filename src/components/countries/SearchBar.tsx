interface SearchBarProps {
    onSearch: (query: string) => void;
  }
  
  function SearchBar({ onSearch }: SearchBarProps) {
    return (
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  }
  
  export default SearchBar; 