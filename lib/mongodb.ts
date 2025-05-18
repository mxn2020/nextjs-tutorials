import { MongoClient, type MongoClientOptions } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""
const MONGODB_DB = process.env.MONGODB_DB || "nextjs-knowledge-library"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Set up connection options with proper timeouts and retry settings
  const options: MongoClientOptions = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // Force TLS version to TLS 1.2
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    // Use the Node.js native DNS module for DNS resolution
    directConnection: false,
  }

  try {
    console.log("Connecting to MongoDB...")

    // Create a new MongoClient
    const client = new MongoClient(MONGODB_URI, options)

    // Connect to the MongoDB server
    await client.connect()
    console.log("Successfully connected to MongoDB")

    const db = client.db(MONGODB_DB)

    // Cache the client and db connection
    cachedClient = client
    cachedDb = db

    // Verify connection by running a simple command
    await db.command({ ping: 1 })
    console.log("MongoDB connection verified with ping")

    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

// Helper function to safely disconnect from MongoDB
export async function disconnectFromDatabase() {
  if (cachedClient) {
    try {
      await cachedClient.close()
      cachedClient = null
      cachedDb = null
      console.log("Disconnected from MongoDB")
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error)
    }
  }
}

// Helper function to check if a collection exists
export async function collectionExists(collectionName: string) {
  try {
    const { db } = await connectToDatabase()
    const collections = await db.listCollections({ name: collectionName }).toArray()
    return collections.length > 0
  } catch (error) {
    console.error(`Error checking if collection ${collectionName} exists:`, error)
    return false
  }
}
