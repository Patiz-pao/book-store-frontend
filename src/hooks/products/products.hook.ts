import { SearchParams } from "@/Types/products/products.types"
import { useState, useEffect } from "react";
import { Book } from "@/Types/bookstore/book.types";
import { useSearchParams } from "next/navigation";

export const useProducts = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<SearchParams>({
    title: searchParams.get("title") || "",
    description: "",
    price: undefined,
    category: searchParams.get("category") || "",
    types: "",
    imageUrl: "",
  });

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const titleParam = searchParams.get("title");
    const categoryParam = searchParams.get("category");

    if (titleParam || categoryParam) {
      setFilters((prev) => ({
        ...prev,
        title: titleParam || prev.title,
        category: categoryParam || prev.category,
      }));
      
      searchBooks({
        ...filters,
        title: titleParam || filters.title,
        category: categoryParam || filters.category,
      });
    } else {
      getBooks();
    }
  }, [searchParams]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks(filters);
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
        setError("ไม่พบหนังสือ - 404");
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
    getBooks,
    filters,
    setFilters,
    handleSearch,
    paginatedBooks,
    goToPrevPage,
    goToNextPage,
    currentPage,
    totalPages,
  };
};