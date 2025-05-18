// MongoDB connection check script
// Run this script with: node scripts/check-mongodb.js

import { MongoClient } from "mongodb"

// Replace with your actual MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || ""
const MONGODB_DB = process.env.MONGODB_DB || "nextjs-knowledge-library"

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable")
  process.exit(1)
}

async function checkDatabase() {
  console.log("Checking MongoDB connection...")
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("✅ Successfully connected to MongoDB")

    const db = client.db(MONGODB_DB)
    console.log(`✅ Connected to database: ${MONGODB_DB}`)

    // Check for required collections
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    console.log("\nChecking required collections:")

    const requiredCollections = ["users", "accounts", "sessions", "verification_tokens"]

    for (const collection of requiredCollections) {
      if (collectionNames.includes(collection)) {
        console.log(`✅ Collection ${collection} exists`)

        // Check document count
        const count = await db.collection(collection).countDocuments()
        console.log(`   - Contains ${count} documents`)

        // Check indexes
        const indexes = await db.collection(collection).indexes()
        console.log(`   - Has ${indexes.length} indexes`)
      } else {
        console.log(`❌ Collection ${collection} is missing`)
      }
    }

    // Check for application-specific collections
    console.log("\nChecking application collections:")

    const appCollections = ["bookmarks", "content_views", "newsletter_subscribers"]

    for (const collection of appCollections) {
      if (collectionNames.includes(collection)) {
        console.log(`✅ Collection ${collection} exists`)

        // Check document count
        const count = await db.collection(collection).countDocuments()
        console.log(`   - Contains ${count} documents`)
      } else {
        console.log(`❌ Collection ${collection} is missing`)
      }
    }

    // Check for admin users
    console.log("\nChecking for admin users:")
    const adminUsers = await db.collection("users").find({ role: "admin" }).toArray()

    if (adminUsers.length > 0) {
      console.log(`✅ Found ${adminUsers.length} admin users:`)
      adminUsers.forEach((user) => {
        console.log(`   - ${user.email}`)
      })
    } else {
      console.log("❌ No admin users found")
    }
  } catch (error) {
    console.error("Error checking MongoDB:", error)
  } finally {
    await client.close()
    console.log("\nMongoDB connection closed")
  }
}

checkDatabase().catch(console.error)
