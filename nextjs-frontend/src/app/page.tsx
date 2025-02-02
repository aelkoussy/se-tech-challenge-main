"use client";
import { useState } from "react";
import { ActivityCard } from "./components/ActivityCard";
import { SearchInput } from "./components/MaterialInput";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // TODO add types
  // TODO add tests
  // TODO add debounce here to avoid too many requests
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    try {
      const response = await fetch(
        `http://localhost:3000/activities?query=${value}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data); // Update state with the response data
    } catch (error) {
      // TODO add error handling showing user a nice message to try again later
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
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
        {/* TODO this will be mapped to cards for the results */}
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
