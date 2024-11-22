"use client";
import React from "react";
import { useBookstore } from "@/hooks/bookstore/bookstore.hook";
import { Pencil, Trash2, Plus, Search, RefreshCw, Book, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminBooksManagement() {
  const { books, loading, error } = useBookstore();
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

  const handleAddNew = () => {
    console.log("Add new book");
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
        <h1 className="text-2xl font-bold">Books Management</h1>
        <Button
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Book
        </Button>
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
                  <TableHead>ID</TableHead>
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
                          <span className="text-sm text-gray-600">Physical</span>
                        </div>
                      ) : book.types === "ebook" ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-gray-600">E-Book</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Unknown Type</span>
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