"use client";
import { useState } from "react";
import { SearchInput } from "./components/MaterialInput";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
          <div key={index}>{result.title}</div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
