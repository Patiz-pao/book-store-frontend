import { Book } from "@/Types/bookstore/book.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHome = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleSearchTitle = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?title=${encodeURIComponent(title)}`);
  };

  const handleSearchCategory = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const getBooks = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/books');
      
      if (response.ok) {
        
        const data = await response.json();
        const shuffledBooks = data.data.sort(() => Math.random() - 0.5);
        setBooks(shuffledBooks.slice(0, 3));
      } else {
        setError("Failed to fetch books");
      }
    } catch (error) {
      setError("An error occurred while fetching books");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { label: "การศึกษา", value: "education" },
    { label: "หนังสือเด็ก", value: "kids" },
    { label: "จิตวิทยา", value: "psychology" },
    { label: "พัฒนาตนเอง", value: "self-help" },
    { label: "ธุรกิจ", value: "business" },
    { label: "วรรณกรรม", value: "literary" },
  ];

  useEffect(() => {
    getBooks();
  }, []);
  
  return {
    books,
    categories,
    title,
    setTitle,
    handleSearchTitle,
    handleSearchCategory,
  };
};
