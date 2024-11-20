"use client";
import React from "react";
import { BookOpen, Search, ShoppingCart, TrendingUp } from "lucide-react";
import { useHome } from "@/hooks/home/home.hook";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const {
    books,
    categories,
    title,
    setTitle,
    handleSearchTitle,
    handleSearchCategory,
  } = useHome();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-slate-300 text-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ยินดีต้อนรับสู่ร้านหนังสือออนไลน์
          </h1>
          <p className="text-xl mb-8">ค้นพบหนังสือดีๆ ที่ใช่สำหรับคุณ</p>
          <div className="flex max-w-xl mx-auto bg-white rounded-lg overflow-hidden">
            <form onSubmit={handleSearchTitle} className="flex w-full">
              <input
                type="text"
                placeholder="ค้นหาหนังสือที่คุณสนใจ..."
                className="flex-1 px-6 py-3 text-gray-700 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="submit"
                className="bg-slate-500 text-white px-6 py-3 flex items-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">หมวดหมู่ยอดนิยม</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ label, value }) => (
            <button
              key={value}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200 text-center"
              onClick={() => handleSearchCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">หนังสือแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <Link
              href={`/products/information/${book.bookId}`}
              key={index}
              className="block transition-transform hover:scale-105"
            >
              <Card className="h-full cursor-pointer hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg mx-auto">
                    {book.title}
                  </CardTitle>
                  <CardContent className="p-0">
                    <img
                      src={book.imageUrl}
                      className="w-auto max-h-[200px] mx-auto object-contain"
                    />
                  </CardContent>
                  <div className="h-[67px] overflow-hidden">
                    <CardDescription className="py-2 text-ellipsis">
                      {book.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center">
                    <CardDescription className="text-sm text-black">
                      ประเภทหนังสือ:
                    </CardDescription>
                    <CardDescription>
                      {book.types === "physical" ? "หนังสือเล่ม" : "E-book"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CardDescription className="text-sm text-black">
                      หมวดหมู่:
                    </CardDescription>
                    <CardDescription>{book.category}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-black-600" />
              <h3 className="font-bold text-lg mb-2">หนังสือหลากหลาย</h3>
              <p className="text-gray-600">
                รวบรวมหนังสือคุณภาพกว่า 10,000 เล่ม
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-black-600" />
              <h3 className="font-bold text-lg mb-2">อัพเดทใหม่ทุกวัน</h3>
              <p className="text-gray-600">หนังสือใหม่ๆ พร้อมโปรโมชั่นพิเศษ</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-black-600" />
              <h3 className="font-bold text-lg mb-2">จัดส่งฟรี</h3>
              <p className="text-gray-600">สำหรับคำสั่งซื้อ 800 บาทขึ้นไป</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
