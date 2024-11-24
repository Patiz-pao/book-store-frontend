"use client";
import React from "react";
import { useBookstore } from "@/hooks/bookstore/bookstore.hook";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  Book,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminBooksManagement() {
  const {
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
  } = useBookstore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBooks = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (bookId: string) => {
    console.log("Edit book:", bookId);
  };

  const handleDelete = (bookId: string) => {
    console.log("Delete book:", bookId);
  };

  if (loading)
    return (
      <div className="items-center justify-center h-screen flex">
        <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มหนังสือใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>เพิ่มหนังสือใหม่</DialogTitle>
              <DialogDescription>
                ปรับเปลี่ยนข้อมูลของคุณได้ที่นี่ กดบันทึกเมื่อแก้ไขเสร็จแล้ว
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={saveBook}>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">ข้อมูลพื้นฐาน</TabsTrigger>
                  <TabsTrigger value="details">รายละเอียดเพิ่มเติม</TabsTrigger>
                  <TabsTrigger value="date">รายละเอียดวันวางขาย</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="title">ชื่อหนังสือ</Label>
                      <Input
                        id="title"
                        placeholder="กรอกชื่อหนังสือ"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">รายละเอียด</Label>
                      <Textarea
                        id="description"
                        placeholder="รายละเอียดหนังสือ"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">ราคา</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="กรอกราคาหนังสือ"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                      {require.price && (
                        <p className="text-red-500 text-sm">{require.price}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="จำนวนหนังสือในสต็อค"
                        value={formData.stock}
                        onChange={handleInputChange}
                      />
                      {require.stock && (
                        <p className="text-red-500 text-sm">{require.stock}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="category">หมวดหมู่</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange(value, "category")
                        }
                        value={formData.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหมวดหมู่หนังสือ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>หมวดหมู่หนังสือ</SelectLabel>
                            <SelectItem value="education">การศึกษา</SelectItem>
                            <SelectItem value="kids">หนังสือเด็ก</SelectItem>
                            <SelectItem value="literary">วรรณกรรม</SelectItem>
                            <SelectItem value="business">ธุรกิจ</SelectItem>
                            <SelectItem value="self-help">
                              พัฒนาตนเอง
                            </SelectItem>
                            <SelectItem value="psychology">จิตวิทยา</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {require.category && (
                        <p className="text-red-500 text-sm">
                          {require.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="type">ประเภท</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange(value, "types")
                        }
                        value={formData.types}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภทหนังสือ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>ประเภทหนังสือ</SelectLabel>
                            <SelectItem value="physical">
                              หนังสือเล่ม
                            </SelectItem>
                            <SelectItem value="ebook">E-Book</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {require.types && (
                        <p className="text-red-500 text-sm">{require.types}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-4">
                  <div className="grid gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Switch
                          onCheckedChange={setIsFileInput}
                          checked={isFileInput}
                        />
                        <Label htmlFor="image">เลือกไฟล์จากในเครื่อง</Label>
                      </div>

                      {!isFileInput && (
                        <Input
                          id="imageUrl"
                          placeholder="กรอก URL ของภาพหนังสือ"
                          className="mt-2"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                        />
                      )}

                      {isFileInput && (
                        <Input
                          id="imageFile"
                          type="file"
                          className="mt-2 text-center"
                        />
                      )}
                    </div>

                    <div>
                      <Label htmlFor="height_thickness">ความหนา</Label>
                      <Input
                        id="height_thickness"
                        placeholder="กรอกความหนา , E-Book กรอก 'PDF'"
                        value={formData.height_thickness}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="pages">จำนวนหน้า</Label>
                      <Input
                        id="pages"
                        placeholder="กรอกจำนวนหน้า"
                        value={formData.pages}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="language">ภาษาหนังสือ</Label>
                      <Input
                        id="language"
                        placeholder="กรอกภาษาของหนังสือ"
                        value={formData.language}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="size">ขนาด</Label>
                      <Input
                        id="size"
                        placeholder="กรอกขนาด , E-Book กรอก 'PDF'"
                        value={formData.size}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="date" className="mt-4">
                  <div className="grid gap-4">
                    <div className="mx-auto">
                      <Calendar
                        mode="single"
                        selected={CalendarDate}
                        onSelect={setCalendarDate}
                        className="rounded-md border shadow w-fit"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button className="bg-gray-600 hover:bg-gray-700" type="submit">
                  เพิ่มหนังสือ
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4 gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Types</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks?.map((book) => (
                  <TableRow key={book.bookId}>
                    <TableCell className="font-medium">{book.bookId}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {book.description}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {book.category}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      {book.types === "physical" ? (
                        <div className="flex items-center gap-2">
                          <Book className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-gray-600">
                            Physical
                          </span>
                        </div>
                      ) : book.types === "ebook" ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-gray-600">E-Book</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            Unknown Type
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{book.price}฿</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          book.stock >= 10
                            ? "bg-green-100 text-green-800"
                            : book.stock >= 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.stock} units
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(book.bookId)}
                        className="hover:bg-blue-50"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(book.bookId)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
