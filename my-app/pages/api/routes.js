import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    res.status(200).json({ status: "Connected" });
  } catch (error) {
    res.status(500).json({ status: "Connection failed", error: error.message });
  } finally {
    await client.close();
  }
}
