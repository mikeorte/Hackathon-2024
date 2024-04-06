import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";

export async function fetchAllEmails() {
  const { db } = await connectToDatabase();
  const emails = await db.collection("Emails").find().toArray();
  return emails;
}

export async function fetchSingleEmail(emailId) {
  const { db } = await connectToDatabase();
  try {
    const query = { _id: new ObjectId(emailId) };
    return await db.collection("Emails").findOne(query);
  } catch (error) {
    console.error("Error fetching single email:", error);
    throw error;
  }
}

export async function fetchTodayEmails() {
  const { db } = await connectToDatabase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const query = { timestamp: { $gte: today.toISOString() } };

  const sort = { timestamp: -1 };

  return await db.collection("Emails").find(query).sort(sort).toArray();
}

export async function fetchAllWeekEmails() {
  const { db } = await connectToDatabase();

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
  const endOfWeek = new Date(today);
  endOfWeek.setHours(23, 59, 59, 999);
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Saturday

  const query = {
    timestamp: {
      $gte: startOfWeek.toISOString(),
      $lte: endOfWeek.toISOString(),
    },
  };

  const sort = { timestamp: -1 };

  return await db.collection("Emails").find(query).sort(sort).toArray();
}

export async function updateSingleEmailSummary(emailId, summary) {
  const { db } = await connectToDatabase();
  try {
    const query = { _id: new ObjectId(emailId) };
    const updateDoc = { $set: { summary: summary } };
    const result = await db.collection("Emails").updateOne(query, updateDoc);
    return result.modifiedCount === 1;
  } catch (error) {
    console.error("Error updating email summary:", error);
    throw error;
  }
}
