import { useEffect, useState } from "react";
import { Book } from "@/Types/bookstore/book.types";

export const useBookstore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await fetch("/api/books");

      if (response.ok) {
        const data = await response.json();
        setBooks(data.data);
      } else {
        setError("Failed to fetch books");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const saveBook = async () => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
      });

      if (response.ok) {
        await getBooks();
      } else {
        setError("Failed to add book");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error };
};
