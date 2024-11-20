import { NextResponse } from "next/server";
import axiosInstance from "../../lib/axiosInstance";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const response = await axiosInstance.get(`/booksId?bookId=${bookId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
