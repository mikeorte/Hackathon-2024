import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      const db = await connectToDatabase();

      // Fetch all emails from the database
      const emails = await db.collection("Emails").find().toArray();

      res.status(200).json(emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ message: "Error fetching emails" });
    }
  } else {
    // Handle any non-GET requests
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
