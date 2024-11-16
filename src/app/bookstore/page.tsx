"use client";
import { useBookstore } from "@/hooks/bookstore/bookstore.hook";

export default function BooksStore() {
  const { books, loading, error } = useBookstore();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{book.bookId}</td>
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.description}</td>
              <td className="px-4 py-2">{book.price}</td>
              <td className="px-4 py-2">{book.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
