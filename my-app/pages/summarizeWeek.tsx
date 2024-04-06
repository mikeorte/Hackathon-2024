import { GetServerSideProps } from "next";
import { format } from "date-fns";
import { fetchAllWeekEmails } from "../lib/dbUtils";
import "./globals.css";

type Email = {
  _id: string;
  sender: string;
  recipient: string;
  timestamp: string;
  subject: string;
  body: string;
  summary?: string;
};

interface SummaryProps {
  emails: Email[];
}

const Summary = ({ emails }: SummaryProps) => (
  <div>
    <div className="header">Here's Your Summary</div>
    {emails.map((email, index) => (
      <div key={index}>
        <div className="details-line outlook-shadow bg-blue-accent">
          {email.subject} | {format(new Date(email.timestamp), "yyyy-MM-dd")}
        </div>
        <div className={"summary-body outlook-shadow bg-light-accent"}>
          {email.summary}
        </div>
      </div>
    ))}
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const emails = await fetchAllWeekEmails();

    const serializedEmails = emails.map((email: Email) => ({
      ...email,
      _id: email._id.toString(),
    }));

    return { props: { emails: serializedEmails } };
  } catch (error) {
    console.error("Error fetching today's emails:", error);
    return { props: { emails: [] } };
  }
};

export default Summary;
