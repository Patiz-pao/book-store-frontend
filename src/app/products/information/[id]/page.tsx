"use client"
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useInformation } from "@/hooks/information/information.hook";

export default function Information() {
  const { book, loading, error } = useInformation();

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-gray-500">ไม่พบข้อมูลหนังสือ</div>
      </div>
    );
  }

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '-';
    }
  
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 relative">
              <img
                src={book.imageUrl || "/api/placeholder/600/800"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        </div>

        {/* Right Column - Information */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 text-white bg-green-500 hover:bg-green-600">
              {book.types === "ebook" ? "E-book" : "หนังสือเล่ม"}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <div className="flex items-baseline space-x-4 mb-6">
              <span className="text-3xl font-bold text-green-700">
                ฿{book.price?.toLocaleString() || 0}
              </span>
            </div>

            <div className="flex space-x-4 mb-6">
              <Button className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                เพิ่มลงตะกร้า
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Book Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">คุณสมบัติสินค้า</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">ความสูง/หนา</p>
                <p>{book.height_thickness || "-"}</p>
              </div>
              <div>
                <p className="text-gray-600">ภาษา</p>
                <p>{book.language || "-"}</p>
              </div>
              <div>
                <p className="text-gray-600">จำนวนหน้า</p>
                <p>{book.pages || "-"}</p>
              </div>
              <div>
                <p className="text-gray-600">วันที่วางขาย</p>
                <p>{book.date ? formatThaiDate(book.date) : '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">ขนาด</p>
                <p>{book.size || "-"}</p>
              </div>
              <div>
                <p className="text-gray-600">หมวดหมู่</p>
                <p>{book.category || "-"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">รายละเอียด</h2>
            <p className="text-gray-700 leading-relaxed">
              {book.description || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
