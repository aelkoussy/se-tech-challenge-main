"use client";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
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

  const fetchResults = async (value: string): Promise<void> => {
    console.log("Fetching results for:", value);
    try {
      const response = await fetch(
        `http://localhost:3000/activities?query=${encodeURIComponent(value)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Activity[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      // TODO: Show a user-friendly error message
    }
  };

  // Debounce the fetch to reduce network calls
  const debouncedFetchResults = useDebouncedCallback((value: string) => {
    fetchResults(value);
  }, 300);

  // Fetch initial results on mount (even before user input)
  useEffect(() => {
    fetchResults("");
  }, []);

  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [debouncedFetchResults]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setInputValue(value);
    debouncedFetchResults(value);
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
