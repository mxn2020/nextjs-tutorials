import { MongoClient } from "mongodb"

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
  const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  }

  // Connect to the MongoDB server
  try {
    const client = new MongoClient(MONGODB_URI, options)
    await client.connect()

    const db = client.db(MONGODB_DB)

    // Cache the client and db connection
    cachedClient = client
    cachedDb = db

    // Verify connection by running a simple command
    await db.command({ ping: 1 })
    console.log("Connected to MongoDB")

    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

// Helper function to check if a collection exists
export async function collectionExists(collectionName: string) {
  const { db } = await connectToDatabase()
  const collections = await db.listCollections({ name: collectionName }).toArray()
  return collections.length > 0
}

// Helper function to ensure required collections exist
export async function ensureCollections(requiredCollections: string[]) {
  const { db } = await connectToDatabase()

  for (const collection of requiredCollections) {
    if (!(await collectionExists(collection))) {
      await db.createCollection(collection)
      console.log(`Created missing collection: ${collection}`)
    }
  }
}
