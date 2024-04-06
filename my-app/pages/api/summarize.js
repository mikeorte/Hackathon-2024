import openai from "../../lib/openaiclient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const emailId = req.query.emailId;

      if (emailId) {
        const email = await fetchSingleEmail(emailId);
        if (!email) {
          return res.status(404).json({ message: "email not found" });
        }

        const summary = await summarizeSingleEmail(email);
        console.log("Summary generated:", summary);

        return res.status(200).json({ ...email, summary });
      }

      const emails = await fetchAllEmails();
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

async function summarizeSingleEmail(db, email) {
  try {
    // Check if the email already has a summary
    if (email.summary && email.summary.trim() !== "") {
      console.log("email already has a summary:", email.summary);
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
      console.log("email summary:", summary);

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
