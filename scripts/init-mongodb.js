// MongoDB initialization script for NextAuth.js
// Run this script with: node scripts/init-mongodb.js

import { MongoClient } from "mongodb"
import { randomUUID } from "crypto"

// Replace with your actual MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || ""
const MONGODB_DB = process.env.MONGODB_DB || "nextjs-knowledge-library"

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable")
  process.exit(1)
}

async function initializeDatabase() {
  console.log("Connecting to MongoDB...")
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(MONGODB_DB)

    // Create collections required by NextAuth.js
    console.log("Creating NextAuth.js collections...")

    // 1. Users collection
    if (!(await db.listCollections({ name: "users" }).hasNext())) {
      await db.createCollection("users")
      console.log("Created users collection")

      // Create indexes for users collection
      await db.collection("users").createIndex({ email: 1 }, { unique: true })
      console.log("Created index on users.email")
    } else {
      console.log("Users collection already exists")
    }

    // 2. Accounts collection (for OAuth providers)
    if (!(await db.listCollections({ name: "accounts" }).hasNext())) {
      await db.createCollection("accounts")
      console.log("Created accounts collection")

      // Create indexes for accounts collection
      await db.collection("accounts").createIndex({ userId: 1 })
      await db.collection("accounts").createIndex({ provider: 1, providerAccountId: 1 }, { unique: true })
      console.log("Created indexes on accounts collection")
    } else {
      console.log("Accounts collection already exists")
    }

    // 3. Sessions collection
    if (!(await db.listCollections({ name: "sessions" }).hasNext())) {
      await db.createCollection("sessions")
      console.log("Created sessions collection")

      // Create indexes for sessions collection
      await db.collection("sessions").createIndex({ sessionToken: 1 }, { unique: true })
      await db.collection("sessions").createIndex({ userId: 1 })
      await db.collection("sessions").createIndex({ expires: 1 }, { expireAfterSeconds: 0 })
      console.log("Created indexes on sessions collection")
    } else {
      console.log("Sessions collection already exists")
    }

    // 4. Verification tokens collection (for email sign-in)
    if (!(await db.listCollections({ name: "verification_tokens" }).hasNext())) {
      await db.createCollection("verification_tokens")
      console.log("Created verification_tokens collection")

      // Create indexes for verification_tokens collection
      await db.collection("verification_tokens").createIndex({ identifier: 1, token: 1 }, { unique: true })
      await db.collection("verification_tokens").createIndex({ expires: 1 }, { expireAfterSeconds: 0 })
      console.log("Created indexes on verification_tokens collection")
    } else {
      console.log("Verification tokens collection already exists")
    }

    // 5. Create admin user (optional)
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      const existingAdmin = await db.collection("users").findOne({ email: adminEmail })

      if (!existingAdmin) {
        const adminUser = {
          name: "Admin User",
          email: adminEmail,
          emailVerified: new Date(),
          image: null,
          role: "admin",
          id: randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await db.collection("users").insertOne(adminUser)
        console.log(`Created admin user with email: ${adminEmail}`)
      } else {
        // Update existing user to admin if not already
        if (existingAdmin.role !== "admin") {
          await db.collection("users").updateOne({ email: adminEmail }, { $set: { role: "admin" } })
          console.log(`Updated user ${adminEmail} to admin role`)
        } else {
          console.log(`Admin user ${adminEmail} already exists`)
        }
      }
    }

    // 6. Create additional collections for your application

    // Bookmarks collection
    if (!(await db.listCollections({ name: "bookmarks" }).hasNext())) {
      await db.createCollection("bookmarks")
      console.log("Created bookmarks collection")

      await db.collection("bookmarks").createIndex({ userId: 1, contentId: 1 }, { unique: true })
      console.log("Created index on bookmarks collection")
    } else {
      console.log("Bookmarks collection already exists")
    }

    // Content views collection (for analytics)
    if (!(await db.listCollections({ name: "content_views" }).hasNext())) {
      await db.createCollection("content_views")
      console.log("Created content_views collection")

      await db.collection("content_views").createIndex({ contentId: 1 })
      await db.collection("content_views").createIndex({ userId: 1 })
      await db.collection("content_views").createIndex({ timestamp: 1 })
      console.log("Created indexes on content_views collection")
    } else {
      console.log("Content views collection already exists")
    }

    // Newsletter subscribers collection
    if (!(await db.listCollections({ name: "newsletter_subscribers" }).hasNext())) {
      await db.createCollection("newsletter_subscribers")
      console.log("Created newsletter_subscribers collection")

      await db.collection("newsletter_subscribers").createIndex({ email: 1 }, { unique: true })
      console.log("Created index on newsletter_subscribers collection")
    } else {
      console.log("Newsletter subscribers collection already exists")
    }

    console.log("MongoDB initialization completed successfully!")
  } catch (error) {
    console.error("Error initializing MongoDB:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

initializeDatabase().catch(console.error)
