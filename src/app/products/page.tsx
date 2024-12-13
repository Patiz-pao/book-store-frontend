"use client";
import { useProducts } from "@/hooks/products/products.hook";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Suspense } from "react";

export default function Products() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const {
    loading,
    error,
    filters,
    setFilters,
    handleSearch,
    paginatedBooks,
    goToPrevPage,
    goToNextPage,
    currentPage,
    totalPages,
  } = useProducts();

  return (
    <div className="container mx-auto py-4 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>สินค้า</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row gap-4 py-4">
        <div className="w-full md:w-[300px]">
          <Card>
            <CardHeader>
              <CardTitle>ตั้งค่าการค้นหา</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">ค้นหาตามชื่อหนังสือ</Label>
                    <Input
                      id="name"
                      placeholder="ชื่อหนังสือ"
                      value={filters.title}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">หมวดหมู่สินค้า</Label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger id="books">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="education">การศึกษา</SelectItem>
                        <SelectItem value="kids">หนังสือเด็ก</SelectItem>
                        <SelectItem value="literary">วรรณกรรม</SelectItem>
                        <SelectItem value="business">ธุรกิจ</SelectItem>
                        <SelectItem value="self-help">พัฒนาตนเอง</SelectItem>
                        <SelectItem value="psychology">จิตวิทยา</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Label>ประเภทหนังสือ</Label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="physical"
                          name="bookType"
                          value="physical"
                          checked={filters.types === "physical"}
                          onChange={() =>
                            setFilters({
                              ...filters,
                              types:
                                filters.types === "physical" ? "" : "physical",
                            })
                          }
                        />
                        <label htmlFor="physical" className="text-sm">
                          หนังสือเล่ม
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="ebook"
                          name="bookType"
                          value="ebook"
                          checked={filters.types === "ebook"}
                          onChange={() =>
                            setFilters({
                              ...filters,
                              types: filters.types === "ebook" ? "" : "ebook",
                            })
                          }
                        />
                        <label htmlFor="ebook" className="text-sm">
                          E-book
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={loading}
                  >
                    {loading ? "กำลังค้นหา..." : "ค้นหา"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          {error && (
            <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedBooks.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  ไม่พบหนังสือที่ค้นหา
                </div>
              ) : (
                paginatedBooks.map((book, index) => (
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
                            {book.types === "physical"
                              ? "หนังสือเล่ม"
                              : "E-book"}
                          </CardDescription>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="flex gap-2 items-center">
                            <CardDescription className="text-sm text-black">
                              หมวดหมู่:
                            </CardDescription>
                            <CardDescription>{book.category}</CardDescription>
                          </div>
                          <CardDescription className="text-xl font-bold text-green-700 text-right">
                            {book.price} ฿
                          </CardDescription>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-6 text-center">
            <Button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="bg-gray-600"
            >
              <ChevronLeft />
            </Button>
            <span className="flex-grow">
              หน้า {currentPage} จาก {totalPages}
            </span>
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-500"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
