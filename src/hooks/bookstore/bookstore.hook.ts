import { FormEvent, useEffect, useState } from "react";
import { Book } from "@/Types/bookstore/book.types";
import React from "react";
import { format } from "date-fns";

export const useBookstore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [CalendarDate, setCalendarDate] = React.useState<Date | undefined>()
  const [isFileInput, setIsFileInput] = useState(false);
  const [require, setRequire] = useState({
    price: "",
    stock: "",
    category: "",
    types: "",
  });

  const saveCalendarDate = (): string | undefined => {
    if (CalendarDate) {
      return format(CalendarDate, "yyyy-MM-dd");
    }
    return undefined;
  };

  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    types: "",
    imageUrl: "",
    height_thickness: "",
    pages: "",
    language: "",
    size: "",
    date: saveCalendarDate(),
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

  const saveBook = async (e: FormEvent<Element>) => {
    e.preventDefault();
    console.log(formData);
    
    const Errors = {
      price: formData.price ? "" : "กรุณากรอกราคา",
      stock: formData.stock ? "" : "กรุณากรอกจำนวนสินค้าในสต็อค",
      category: formData.category ? "" : "กรุณาเลือกหมวดหมู่",
      types: formData.types ? "" : "กรุณาเลือกประเภทหนังสือ",
    };
    setRequire(Errors);
    const hasErrors = Object.values(Errors).some((error) => error);
    if (hasErrors) return;
    try {
      setLoading(true);
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        await getBooks();
        console.log("Book saved successfully");
      } else {
        setError("Failed to add book");
      }
    } catch (error) {
      setError("An error occurred while saving the book");
      console.error("Save book error:", error);
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
    require,
    CalendarDate,
    setCalendarDate,
    setIsFileInput,
    handleInputChange,
    handleSelectChange,
    saveBook,
  };
};
