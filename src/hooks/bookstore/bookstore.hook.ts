import { useEffect, useState } from "react";
import { Book } from "@/Types/bookstore/book.types";

export const useBookstore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isFileInput, setIsFileInput] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    type: "",
    imageUrl: "",
    height_thickness: "",
    pages: "",
    language: "",
    size: "",
  });

  const handleInputChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
  };

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

  return {
    books,
    loading,
    error,
    formData,
    isFileInput,
    setIsFileInput,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
};
