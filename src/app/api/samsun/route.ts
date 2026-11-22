import { NextResponse } from "next/server";

export const revalidate = 900; // Cache for 15 minutes (900 seconds)

export async function GET() {
  // Test override requested by user: morning-clear
  return NextResponse.json({
    isDay: true,
    weatherCode: 0,
    condition: "clear",
    videoFile: "/videos/morning-clear.webm",
    statusText: "clear",
    theme: "day",
    updatedAt: new Date().toISOString(),
  });
}
