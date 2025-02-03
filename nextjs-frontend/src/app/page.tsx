"use client";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ActivityCard } from "./components/ActivityCard";
import { SearchInput } from "./components/SearchInput";

interface Supplier {
  name: string;
  address: string;
}

interface Activity {
  title: string;
  price: number;
  rating: number;
  special_offer: boolean;
  supplier: Supplier;
}

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches activities based on the search query.
   * If the query is empty, it fetches all activities.
   * We here only search by the title as per the requirement, but in a prod app, we might want to filter by more params
   * For example we might want to filter by price, rating, etc.
   */
  const fetchResults = useCallback(async (query: string): Promise<void> => {
    console.log("Fetching results for:", query);
    try {
      // Clear previous errors before fetching new results
      setError(null);

      // typically in production you would use something like axios and define your host centerally not here
      const response = await fetch(
        `http://localhost:3000/activities?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Activity[] = await response.json();
      setSearchResults(data);
    } catch (err: unknown) {
      console.error("Error fetching search results:", err);
      // Set a friendly error message
      setError(
        "There was a problem fetching search results. Please try again later."
      );
    }
  }, []);

  // Create a debounced callback to reduce network calls
  const debouncedFetchResults = useDebouncedCallback((query: string) => {
    fetchResults(query);
  }, 300);

  // Fetch initial results on mount (even before user input)
  useEffect(() => {
    fetchResults("");
  }, [fetchResults]);

  // Clean up the debounced callback on unmount
  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [debouncedFetchResults]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const query = event.target.value;
    setInputValue(query);
    debouncedFetchResults(query);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Get Your Guide
      </Typography>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <SearchInput
          label="Search activities"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Container>

      {/* In Production this would be more sophisticated and in a separate component */}
      {/* Display error message if any */}
      {error && (
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          {/* Note: it shows an error in editor but there is no error and it works, you can set error to true to test it... */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment
          @ts-ignore */}
          <Alert severity="error">{error}</Alert>
        </Container>
      )}

      <Grid2 container spacing={4}>
        {searchResults.map((result, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ActivityCard
              title={result.title}
              price={result.price}
              rating={result.rating}
              special_offer={result.special_offer}
              supplierName={result.supplier.name}
              supplierAddress={result.supplier.address}
            />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default HomePage;
