import type { Country } from "../types/country";

const BASE_URL = "https://restcountries.com/v3.1";

const apiFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Not found");
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error(
        `Client error: ${response.status} ${response.statusText}`
      );
    }
    if (response.status >= 500) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`
      );
    }
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const fetchCountries = async (): Promise<Country[]> => {
  return apiFetch<Country[]>(
    `${BASE_URL}/all?fields=name,flags,population,region,capital`
  );
};

export const searchCountries = async (name: string): Promise<Country[]> => {
  if (!name || name.trim().length === 0) {
    throw new Error("Please enter a country name to search");
  }

  try {
    return await apiFetch<Country[]>(
      `${BASE_URL}/name/${encodeURIComponent(
        name
      )}?fields=name,flags,population,region,capital`
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("Not found")) {
      throw new Error(`No countries found matching "${name}"`);
    }
    throw error;
  }
};

export const fetchCountriesByRegion = async (
  region: string
): Promise<Country[]> => {
  if (!region || region.trim().length === 0) {
    throw new Error("Please select a region");
  }

  try {
    return await apiFetch<Country[]>(
      `${BASE_URL}/region/${encodeURIComponent(
        region
      )}?fields=name,flags,population,region,capital`
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("Not found")) {
      throw new Error(`No countries found in region "${region}"`);
    }
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country> => {
  if (!name || name.trim().length === 0) {
    throw new Error("Country name is required");
  }

  try {
    const countries = await apiFetch<Country[]>(
      `${BASE_URL}/name/${encodeURIComponent(
        name
      )}?fields=name,flags,population,region,capital,area,languages,currencies,borders,timezones&fullText=true`
    );

    if (!countries || countries.length === 0) {
      throw new Error(`Country "${name}" not found`);
    }

    return countries[0];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Not found")) {
      throw new Error(`Country "${name}" not found`);
    }
    throw error;
  }
};
