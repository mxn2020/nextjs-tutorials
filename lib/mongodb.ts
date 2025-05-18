import { MongoClient, type MongoClientOptions } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""
const MONGODB_DB = process.env.MONGODB_DB || "nextjs-knowledge-library"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

// Connection options
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

// Global variable to cache the MongoDB connection
let cachedClient: MongoClient | null = null
let cachedDb: any = null

// Create a new MongoClient
const client = new MongoClient(MONGODB_URI, options)
const clientPromise = client.connect()

// Export a module-scoped MongoClient promise
export default clientPromise

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    console.log("Connecting to MongoDB...")

    // Connect to the MongoDB server
    const client = await clientPromise
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
