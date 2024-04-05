import openai from "../../lib/openaiclient";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const emailId = req.query.emailId;

      if (emailId) {
        const email = await fetchSingleEmail(db, emailId);
        if (!email) {
          return res.status(404).json({ message: "Email not found" });
        }

        const summary = await summarizeSingleEmail(db, email); // Pass db to summarizeEmail
        console.log("Summary generated:", summary);

        return res.status(200).json(email);
      }

      const emails = await fetchAllEmails(db);
      res.status(200).json(emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ message: "Error fetching emails" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function fetchAllEmails(db) {
  return await db.collection("Emails").find().toArray();
}

async function fetchSingleEmail(db, emailId) {
  try {
    const emailObjectId = new ObjectId(emailId);
    const query = { _id: emailObjectId };
    const email = await db.collection("Emails").findOne(query);
    return email;
  } catch (error) {
    console.error("Error fetching single email:", error);
    throw error;
  }
}

async function fetchTodayEmails(db) {
  try {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Query emails received today
    const query = { receivedAt: { $gte: today } };
    const todayEmails = await db.collection("Emails").find(query).toArray();
    return todayEmails;
  } catch (error) {
    console.error("Error fetching today's emails:", error);
    throw error;
  }
}

async function summarizeSingleEmail(db, email) {
  try {
    // Check if the email already has a summary
    if (email.summary && email.summary.trim() !== "") {
      console.log("Email already has a summary:", email.summary);
      return email.summary;
    }

    // If the email doesn't have a summary, proceed with the summarization process
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4-turbo-preview"
      messages: [
        {
          role: "system",
          content: "You are summarizing an email",
        },
        {
          role: "user",
          content: email.body,
        },
      ],
      max_tokens: 100,
    });

    console.log("Completion response:", completion);

    if (
      completion &&
      completion.choices &&
      completion.choices[0] &&
      completion.choices[0].message &&
      completion.choices[0].message.content
    ) {
      const summary = completion.choices[0].message.content.trim();
      console.log("Email summary:", summary);

      await updateSingleEmailSummary(db, email._id, summary);

      return summary;
    } else {
      console.error("Error: Incomplete or unexpected response from OpenAI");
      return "Error summarizing email";
    }
  } catch (error) {
    console.error("Error summarizing email:", error);
    return "Error summarizing email";
  }
}

async function updateSingleEmailSummary(db, emailId, summary) {
  try {
    const query = { _id: emailId };
    const updateDoc = {
      $set: {
        summary: summary,
      },
    };

    const result = await db.collection("Emails").updateOne(query, updateDoc);

    if (result.modifiedCount === 1) {
      console.log("Email summary updated successfully");
      return true;
    } else {
      console.log("No email found with the provided ID");
      return false;
    }
  } catch (error) {
    console.error("Error updating email summary:", error);
    throw error;
  }
}

// NOT WORKING
// async function summarizeTodayEmails(db) {
//   try {
//     // Fetch all emails received today
//     const todayEmails = await fetchTodayEmails(db);

//     // Aggregate the bodies of all emails received today
//     const aggregatedText = todayEmails.map((email) => email.body).join("\n");

//     // Proceed with the summarization process
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or "gpt-4-turbo-preview"
//       messages: [
//         {
//           role: "system",
//           content: "You are summarizing emails received today",
//         },
//         {
//           role: "user",
//           content: aggregatedText,
//         },
//       ],
//       max_tokens: 200, // Adjust the max_tokens as needed
//     });

//     console.log("Completion response:", completion);

//     if (
//       completion &&
//       completion.choices &&
//       completion.choices[0] &&
//       completion.choices[0].message &&
//       completion.choices[0].message.content
//     ) {
//       const summary = completion.choices[0].message.content.trim();
//       console.log("Emails summary:", summary);

//       // Update all emails received today with the same summary
//       await updateTodayEmailsSummary(
//         db,
//         todayEmails.map((email) => email._id),
//         summary
//       );

//       console.log("All emails received today summarized successfully");
//     } else {
//       console.error("Error: Incomplete or unexpected response from OpenAI");
//     }
//   } catch (error) {
//     console.error("Error summarizing today's emails:", error);
//     throw error;
//   }
// }
