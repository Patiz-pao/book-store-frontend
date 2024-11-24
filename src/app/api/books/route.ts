import { NextResponse } from 'next/server';
import axiosInstance from '../../lib/axiosInstance';

export async function GET() {
  try {
    const response = await axiosInstance.get('/books');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Data:", body);

    const response = await axiosInstance.post("/books", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error saving book:", error.message || error);
    return NextResponse.json({ error: "Failed to save book" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Data:", body);
    const { bookId } = body;

    if (!bookId) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const response = await axiosInstance.put(`/books?bookId=${bookId}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error update book:", error.message || error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

