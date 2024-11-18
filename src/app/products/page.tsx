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

export default function Products() {
  const { books, loading, error, searchParams, setSearchParams, handleSearch } = useProducts();

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
        {/* Search Form Card */}
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
                      value={searchParams.title}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">หมวดหมู่สินค้า</Label>
                    <Select
                      onValueChange={(value) =>
                        setSearchParams({
                          ...searchParams,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger id="books">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="kids">หนังสือเด็ก</SelectItem>
                        <SelectItem value="cartoons">การ์ตูนมังงะ</SelectItem>
                        <SelectItem value="education">การศึกษา</SelectItem>
                        <SelectItem value="technology">
                          วิทยาการและเทคโนโลยี
                        </SelectItem>
                        <SelectItem value="literary">วรรณกรรม</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label>ประเภทหนังสือ</Label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="physical"
                          name="bookType"
                          value="physical"
                          checked={searchParams.types === "physical"}
                          onChange={() =>
                            setSearchParams({
                              ...searchParams,
                              types: "physical",
                            })
                          }
                        />
                        <label htmlFor="physical" className="text-sm">
                          หนังสือเล่ม
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="ebook"
                          name="bookType"
                          value="ebook"
                          checked={searchParams.types === "ebook"}
                          onChange={() =>
                            setSearchParams({
                              ...searchParams,
                              types: "ebook",
                            })
                          }
                        />
                        <label htmlFor="ebook" className="text-sm">
                          หนังสืออิเล็กทรอนิกส์
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

        {/* Results Section */}
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
              {books.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  ไม่พบหนังสือที่ค้นหา
                </div>
              ) : (
                books.map((book, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg mx-auto">{book.title}</CardTitle>
                      <CardContent className="p-0">
                        <img src={book.imageUrl} className="w-[50%] mx-auto" />
                      </CardContent>
                      <CardDescription className="py-2">
                        {book.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 items-center">
                        <CardDescription className="text-sm text-black">
                          ประเภทหนังสือ:
                        </CardDescription>
                        <CardDescription>
                          {book.type === "physical" ? "หนังสือเล่ม" : "E-book"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CardDescription className="text-sm text-black">
                          หมวดหมู่:
                        </CardDescription>
                        <CardDescription>
                          {book.category}
                        </CardDescription>
                      </div>
                    <Button className="bg-green-600 mt-2">
                      <Link href="/">ดูเพิ่มเติม</Link>
                    </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
