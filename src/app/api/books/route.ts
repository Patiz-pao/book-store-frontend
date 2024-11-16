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
