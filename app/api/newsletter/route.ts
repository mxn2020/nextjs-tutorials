import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Check if email already exists
    const existingSubscriber = await db.collection("newsletter_subscribers").findOne({ email })

    if (existingSubscriber) {
      return NextResponse.json({ success: true, message: "You're already subscribed!" }, { status: 200 })
    }

    // Add email to database
    await db.collection("newsletter_subscribers").insertOne({
      email,
      subscribedAt: new Date(),
    })

    // In a production application, you might also want to:
    // 1. Add the user to your email marketing platform (e.g., Mailchimp, ConvertKit)
    // 2. Send a welcome email

    return NextResponse.json({ success: true, message: "Successfully subscribed!" }, { status: 200 })
  } catch (error) {
    console.error("Error in newsletter subscription:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
