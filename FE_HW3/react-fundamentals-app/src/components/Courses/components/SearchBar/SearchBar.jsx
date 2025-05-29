import React, { useState } from "react";
import { Button } from "../../../../common/Button";
import { Input } from "../../../../common/Input";
import styles from "./styles.module.css";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search input is cleared, reset search results
    if (!value) {
      onSearch("");
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        placeholderText="Enter course name or ID..."
        labelText=""
        onChange={handleInputChange}
        data-testid="searchInput"
      />
      <Button
        buttonText="SEARCH"
        handleClick={handleSearch}
        data-testid="searchButton"
      />
    </div>
  );
};
