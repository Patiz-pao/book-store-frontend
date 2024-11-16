import { NextResponse } from "next/server";
import axiosInstance from "../../lib/axiosInstance";

export async function POST(body: Request) {
  try {
    const { username, password } = await body.json();

    const response = await axiosInstance.post("/login", null, {
      params: { username, password },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }
}
