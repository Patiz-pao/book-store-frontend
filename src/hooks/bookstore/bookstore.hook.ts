import { FormEvent, useEffect, useState } from "react";
import { Book } from "@/Types/bookstore/book.types";
import React from "react";
import { format } from "date-fns";

export const useBookstore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [CalendarDate, setCalendarDate] = React.useState<Date | null>();
  const [isFileInput, setIsFileInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [require, setRequire] = useState({
    price: "",
    stock: "",
    category: "",
    types: "",
  });

  const saveCalendarDate = (): string | undefined => {
    if (CalendarDate instanceof Date && !isNaN(CalendarDate.getTime())) {
      const formattedDate = format(CalendarDate, "yyyy-MM-dd");
      return formattedDate;
    }
    return undefined;
  };  

  const FormData = {
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
  };

  const [formData, setFormData] = useState(FormData);

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

  const resetForm = () => {
    setFormData(FormData);
    setCalendarDate(null);
    setIsFileInput(false);
    setIsEditing(false);
    setRequire({
      price: "",
      stock: "",
      category: "",
      types: "",
    });
  };

  useEffect(() => {
    getBooks();
    if (CalendarDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: format(CalendarDate, "yyyy-MM-dd"),
      }));
    }
  }, [CalendarDate]);

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

  const handleEdit = (bookId: string) => {
    const bookToEdit = books.find((book) => book.bookId === bookId);
    if (bookToEdit) {
      setFormData({
        ...bookToEdit,
        price: bookToEdit.price.toString(),
        stock: bookToEdit.stock.toString(),
        date: bookToEdit.date.toString(),
      });
  
      if (bookToEdit.date) {
        const parsedDate = new Date(bookToEdit.date);
        if (!isNaN(parsedDate.getTime())) {
          setCalendarDate(parsedDate);
        } else {
          console.warn("Invalid date format:", bookToEdit.date);
          setCalendarDate(new Date());
        }
      } else {
        setCalendarDate(new Date());
      }
  
      setIsEditing(true);
      setDialogOpen(true);
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
        setDialogOpen(false);
        resetForm();
        handleAlertSave();
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

  const updateBook = async (e: FormEvent<Element>) => {
    e.preventDefault();

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await getBooks();
        setDialogOpen(false);
        resetForm();
        handleAlertUpdate();
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

  const handleAlertSave = () => {
    setAlertMessage("Add Success");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  };

  const handleAlertUpdate = () => {
    setAlertMessage("Update Success");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  };

  return {
    books,
    loading,
    error,
    formData,
    isFileInput,
    require,
    CalendarDate,
    isEditing,
    dialogOpen,
    alertOpen,
    alertMessage,
    handleAlertSave,
    handleAlertUpdate,
    updateBook,
    setDialogOpen,
    setCalendarDate,
    setIsFileInput,
    handleInputChange,
    handleSelectChange,
    handleEdit,
    saveBook,
    resetForm,
    setAlertOpen,
  };
};
