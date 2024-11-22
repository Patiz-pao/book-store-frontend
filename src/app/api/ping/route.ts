import { NextResponse } from "next/server";
import axiosInstance from "../../lib/axiosInstance";

export async function GET() {
  try {
    const response = await axiosInstance.get("/ping");

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error during ping:", error.message);

    return NextResponse.json(
      { error: "Failed to ping backend" },
      { status: 500 }
    );
  }
}
