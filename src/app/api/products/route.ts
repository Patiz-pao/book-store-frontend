import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "../../lib/axiosInstance";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const title = searchParams.get("title");
    const description = searchParams.get("description");
    const price = searchParams.get("price");
    const category = searchParams.get("category");
    const types = searchParams.get("types");
    const imageurl = searchParams.get("imageUrl");

    const params = {
      title: title || null,
      description: description || null,
      price: price ? parseFloat(price) : null,
      category: category || null,
      types: types || null,
      imageUrl: imageurl || null,
    };

    const response = await axiosInstance.get("/books/search", { params });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
