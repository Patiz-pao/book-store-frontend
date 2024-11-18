import { useState } from "react";

export const useProducts = () => {
  const [searchParams, setSearchParams] = useState({
    bookName: "",
    category: "",
    types: {
      physical: false,
      ebook: false,
    },
  });

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (searchParams.bookName) {
        queryParams.append("name", searchParams.bookName);
      }

      if (searchParams.category) {
        queryParams.append("category", searchParams.category);
      }
      const selectedTypes = Object.entries(searchParams.types)
        .filter(([_, checked]) => checked)
        .map(([type]) => type);

      if (selectedTypes.length > 0) {
        queryParams.append("types", selectedTypes.join(","));
      }

      const response = await fetch(
        `/api/books/search?${queryParams.toString()}`
      );
      const data = await response.json();

      console.log("Search results:", data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return { setSearchParams, handleSearch, searchParams };
};
