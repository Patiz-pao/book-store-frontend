
import { SearchParams } from "@/Types/products/products.types"
import { useState, useEffect } from "react";
import { Book } from "@/Types/bookstore/book.types";

export const useProducts = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/books');
      
      if (response.ok) {
        const data = await response.json();
        setBooks(data.data);
      } else {
        setError("Failed to fetch books");
      }
    } catch (error) {
      setError("An error occurred while fetching books");
    } finally {
      setLoading(false);
    }
  };


  const searchBooks = async (params: SearchParams) => {
    setLoading(true);
    setError("");
  
    try {
      const filteredParams = Object.fromEntries(
        Object.entries({
          title: params.title,
          description: params.description,
          price: params.price ? params.price.toString() : undefined,
          category: params.category,
          types: params.types !== "" ? params.types : undefined,
        }).filter(([_, value]) => value !== undefined && value !== null && value !== "")
      ) as Record<string, string>;
  
      const queryParams = new URLSearchParams(filteredParams).toString();
  
      const response = await fetch(`/api/products?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setBooks(data.data);
      } else {
        setError("Failed to search books");
      }
    } catch (error) {
      setError("An error occurred while searching books");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    books,
    loading,
    error,
    searchBooks,
    getBooks,
  };
};