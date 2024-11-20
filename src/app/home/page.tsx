"use client"
import React, { useState } from "react";
import { BookOpen, Search, ShoppingCart, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHome } from "@/hooks/home/home.hook"

export default function Home() {
  const { featuredBooks, categories, title, setTitle, handleSearch } = useHome();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-slate-300 text-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ยินดีต้อนรับสู่ร้านหนังสือออนไลน์
          </h1>
          <p className="text-xl mb-8">ค้นพบหนังสือดีๆ ที่ใช่สำหรับคุณ</p>
          {/* This call api */}
          <div className="flex max-w-xl mx-auto bg-white rounded-lg overflow-hidden">
            <form onSubmit={handleSearch} className="flex w-full">
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

      {/* Categories */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">หมวดหมู่ยอดนิยม</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200 text-center"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Books */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">หนังสือแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <div
              key={book.title}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              <img
                src={book.image}
                alt={book.title}
                className="object-cover mx-auto w-[50%]"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-bold">{book.price}</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
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
