import { NextResponse } from "next/server";
import { fetchCatholicReadings } from "@/lib/fetchReadings";

export async function GET() {
  try {
    const data = await fetchCatholicReadings();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch readings" },
      { status: 500 }
    );
  }
}