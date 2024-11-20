import { useRouter } from "next/navigation";
import { useState } from "react";

export const useHome = () => {

    const router = useRouter();
    const [title, setTitle] = useState("");
  
    const handleSearchTitle = (e: React.FormEvent) => {
      e.preventDefault();
      router.push(`/products?title=${encodeURIComponent(title)}`);
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
        "การศึกษา",
        "หนังสือเด็ก",
        "จิตวิทยา",
        "พัฒนาตนเอง",
        "ธุรกิจ",
        "วรรณกรรม"
      ];

    return {featuredBooks, categories, title, setTitle, handleSearchTitle}
}