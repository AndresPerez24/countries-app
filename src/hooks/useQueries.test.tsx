import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCountryQuery } from "./useQueries";
import { fetchCountryByName } from "../utils/api";

jest.mock("../utils/api");
const mockFetchCountryByName = fetchCountryByName as jest.MockedFunction<
  typeof fetchCountryByName
>;
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useQueries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useCountryQuery", () => {
    it("should fetch country details successfully", async () => {
      const mockCountry = {
        name: { common: "Spain", official: "Kingdom of Spain" },
        flags: { svg: "spain.svg", png: "spain.png" },
        population: 46754778,
        region: "Europe",
        capital: ["Madrid"],
        area: 505990,
        languages: { spa: "Spanish" },
        currencies: { EUR: { name: "Euro", symbol: "€" } },
        borders: ["AND", "FRA", "GIB", "PRT", "MAR"],
        timezones: ["UTC+01:00"],
      };

      mockFetchCountryByName.mockResolvedValue(mockCountry);

      const { result } = renderHook(() => useCountryQuery("spain"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockCountry);
      expect(mockFetchCountryByName).toHaveBeenCalledWith("spain");
    });

    it("should not fetch when country name is empty", () => {
      const { result } = renderHook(() => useCountryQuery(""), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockFetchCountryByName).not.toHaveBeenCalled();
    });
  });
});
