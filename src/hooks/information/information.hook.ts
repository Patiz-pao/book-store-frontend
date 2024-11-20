import { useState, useEffect } from "react";
import { Book } from "@/Types/bookstore/book.types";
import { useParams } from "next/navigation";

export const useInformation = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const params = useParams();
  const bookId = params.id;

  const getBookById = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/information?bookId=${bookId}`);

      if (response.ok) {
        const data = await response.json();
        
        setBook(data.data);
      } else {
        setError("Failed to fetch book");
      }
    } catch (error) {
      setError("An error occurred while fetching book");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      getBookById();
    }
  }, [bookId]);

  return { book, loading, error };
};
