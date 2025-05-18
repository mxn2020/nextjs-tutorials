// MongoDB connection test script
// Run with: node -r dotenv/config scripts/test-mongodb-connection.js

import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable")
  process.exit(1)
}

async function testConnection() {
  console.log("Testing MongoDB connection...")
  console.log(
    `Connection string format: ${MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, "mongodb+srv://username:****@")}`,
  )

  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    directConnection: false,
  }

  let client
  try {
    client = new MongoClient(MONGODB_URI, options)
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Successfully connected to MongoDB")

    // Get server info
    const admin = client.db().admin()
    const serverInfo = await admin.serverInfo()
    console.log(`MongoDB server version: ${serverInfo.version}`)

    // List databases
    const dbs = await admin.listDatabases()
    console.log("Available databases:")
    dbs.databases.forEach((db) => {
      console.log(`- ${db.name} (${Math.round((db.sizeOnDisk / 1024 / 1024) * 100) / 100} MB)`)
    })

    // Test a simple operation
    const ping = await client.db().command({ ping: 1 })
    console.log("Ping result:", ping)

    console.log("✅ MongoDB connection test successful!")
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error)

    // Provide more specific error guidance
    if (error.name === "MongoServerSelectionError") {
      console.error("\nPossible causes:")
      console.error("1. Network connectivity issues")
      console.error("2. MongoDB Atlas IP allowlist restrictions")
      console.error("3. Incorrect username or password")
      console.error("4. TLS/SSL certificate issues")

      console.error("\nRecommended actions:")
      console.error("1. Check your MongoDB Atlas network access settings")
      console.error("2. Add 0.0.0.0/0 to your IP allowlist temporarily for testing")
      console.error("3. Verify username and password in your connection string")
      console.error("4. Check if your MongoDB Atlas cluster is active")
    }
  } finally {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  }
}

testConnection().catch(console.error)
