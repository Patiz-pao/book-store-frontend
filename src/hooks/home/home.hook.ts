import { useRouter } from "next/navigation";
import { useState } from "react";

export const useHome = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchTitle = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?title=${encodeURIComponent(title)}`);
  };

  const handleSearchCategory = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const featuredBooks = [
    {
      title: "เจ้าชายน้อย",
      author: "อ็องตวน เดอ แซงเตกซูว์ปีรี",
      price: "฿299",
      image:
        "https://mp-static.se-ed.com/e-book-audio/b7n1279bwgzwn9ba9jy1/image/fd0zhfr0",
    },
    {
      title: "แฮร์รี่ พอตเตอร์",
      author: "เจ.เค. โรว์ลิ่ง",
      price: "฿359",
      image:
        "https://mp-static.se-ed.com/e-book-audio/b7n1279bwgzwn9ba9jy1/image/fd0zhfr0",
    },
    {
      title: "เดอะ อัลเคมิสต์",
      author: "เปาโล โคเอลโญ",
      price: "฿279",
      image:
        "https://mp-static.se-ed.com/e-book-audio/b7n1279bwgzwn9ba9jy1/image/fd0zhfr0",
    },
  ];

  const categories = [
    { label: "การศึกษา", value: "education" },
    { label: "หนังสือเด็ก", value: "kids" },
    { label: "จิตวิทยา", value: "psychology" },
    { label: "พัฒนาตนเอง", value: "self-help" },
    { label: "ธุรกิจ", value: "business" },
    { label: "วรรณกรรม", value: "literary" },
  ];

  return {
    featuredBooks,
    categories,
    title,
    setTitle,
    handleSearchTitle,
    handleSearchCategory,
  };
};
