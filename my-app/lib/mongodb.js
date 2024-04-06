import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }
  await clientPromise;
  const db = client.db("Email-Summerizer");
  return { db };
}
