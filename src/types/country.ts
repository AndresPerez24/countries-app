export interface Country {
  name: {
    common: string;
    official?: string;
  };
  flags: {
    png: string;
    svg?: string;
    alt?: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  area?: number;
  currencies?: Record<string, {
    name: string;
    symbol: string;
  }>;
  languages?: Record<string, string>;
  tld?: string[];
  borders?: string[];
}

export interface UseCountriesDataOptions {
  searchTerm?: string;
  selectedRegion?: string;
  sortField?: "name" | "population";
  sortOrder?: "asc" | "desc";
  activeTab?: "all" | "favorites";
  favoriteNames?: string[];
}