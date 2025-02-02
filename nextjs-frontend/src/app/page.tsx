"use client";
import { useDebouncedCallback } from "use-debounce";

import React, { useEffect, useState } from "react";
import { ActivityCard } from "./components/ActivityCard";
import { SearchInput } from "./components/MaterialInput";

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

// TODO add tests
const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Activity[]>([]);

  // Function to fetch search results with a log to test timing
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
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      // TODO: show a friendly error message to the user
    }
  };

  // Create a debounced version of fetchResults that delays execution by 4000ms.
  const debouncedFetchResults = useDebouncedCallback((value: string) => {
    fetchResults(value);
  }, 300);
  // Clean up the debounced function on component unmount.
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
    <div>
      <h1>Get your guide</h1>
      <SearchInput
        label="Enter something here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div>
        {searchResults.map((result, index) => (
          <ActivityCard
            key={index}
            title={result.title}
            price={result.price}
            rating={result.rating}
            special_offer={result.special_offer}
            supplierName={result.supplier.name}
            supplierAddress={result.supplier.address}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
