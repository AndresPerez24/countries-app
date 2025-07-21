import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCountries,
  searchCountries,
  fetchCountriesByRegion,
  fetchCountryByName,
} from "../utils/api";
import {
  filterBySearch,
  filterByRegion,
  sortCountries,
} from "../utils/countryUtils";
import type { UseCountriesDataOptions } from "../types/country";

export const useCountryQuery = (countryName: string) => {
  return useQuery({
    queryKey: ["country", countryName],
    queryFn: () => fetchCountryByName(countryName),
    enabled: !!countryName,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCountriesData = ({
  searchTerm = "",
  selectedRegion = "",
  sortField = "name",
  sortOrder = "asc",
  activeTab = "all",
  favoriteNames = [],
}: UseCountriesDataOptions) => {
  const shouldSearch = searchTerm.trim().length > 0;
  const shouldFilterByRegion =
    selectedRegion.trim().length > 0 && !shouldSearch;

  const allCountriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    enabled: !shouldSearch && !shouldFilterByRegion,
  });

  const searchQuery = useQuery({
    queryKey: ["countries", "search", searchTerm],
    queryFn: () => searchCountries(searchTerm),
    enabled: shouldSearch,
    staleTime: 2 * 60 * 1000,
  });

  const regionQuery = useQuery({
    queryKey: ["countries", "region", selectedRegion],
    queryFn: () => fetchCountriesByRegion(selectedRegion),
    enabled: shouldFilterByRegion,
    staleTime: 5 * 60 * 1000,
  });

  const activeQuery = shouldSearch
    ? searchQuery
    : shouldFilterByRegion
    ? regionQuery
    : allCountriesQuery;

  const processedData = useMemo(() => {
    const countries = activeQuery.data || [];

    let filtered = countries;

    if (activeTab === "favorites" && favoriteNames.length > 0) {
      filtered = filtered.filter((country) =>
        favoriteNames.includes(country.name.common)
      );
    }

    if (searchTerm && !shouldSearch) {
      filtered = filterBySearch(filtered, searchTerm);
    }

    if (selectedRegion && !shouldFilterByRegion) {
      filtered = filterByRegion(filtered, selectedRegion);
    }

    filtered = sortCountries(filtered, sortField, sortOrder);

    return filtered;
  }, [
    activeQuery.data,
    activeTab,
    favoriteNames,
    searchTerm,
    shouldSearch,
    selectedRegion,
    shouldFilterByRegion,
    sortField,
    sortOrder,
  ]);

  return {
    data: processedData,
    isLoading: activeQuery.isLoading,
    error: activeQuery.error,
    isError: activeQuery.isError,
    refetch: activeQuery.refetch,
  };
};
