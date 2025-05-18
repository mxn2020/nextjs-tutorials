import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const startTime = Date.now()
    const { db } = await connectToDatabase()

    // Ping the database to check connection
    await db.command({ ping: 1 })

    const responseTime = Date.now() - startTime

    // Get database stats
    const stats = await db.stats()

    return NextResponse.json({
      status: "connected",
      responseTime: `${responseTime}ms`,
      collections: stats.collections,
      dbName: stats.db,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Database connection check failed:", error)

    return NextResponse.json(
      {
        status: "disconnected",
        error: error.message || "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
