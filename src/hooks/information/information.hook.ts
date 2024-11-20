import { useState, useEffect } from "react";
import { Book } from "@/Types/bookstore/book.types";
import { useParams } from "next/navigation";

export const useInformation = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddToCart = () => {
    setAlertMessage("เพิ่มลงตะกร้า สำเร็จ! (Mockup)");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  };

  const handleShare = () => {
    setAlertMessage("แชร์สำเร็จ! (Mockup)");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  };

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  useEffect(() => {
    if (bookId) {
      getBookById();
    }
  }, [bookId]);

  return {
    book,
    loading,
    error,
    formatThaiDate,
    handleAddToCart,
    toggleHeart,
    isHeartFilled,
    handleShare,
    alertOpen,
    setAlertOpen,
    alertMessage
  };
};
