import { NextResponse } from "next/server";
import axiosInstance from "../../lib/axiosInstance";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axiosInstance.post("/register",body);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }
}
