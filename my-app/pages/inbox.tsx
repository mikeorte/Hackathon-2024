import React from "react";
import { GetServerSideProps } from "next";
import { fetchAllEmails } from "../lib/dbUtils";
import { useRouter } from "next/router";
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

type EmailBoxProps = {
  sender: string;
  timestamp: string;
  subject: string;
};

type HomeProps = {
  emails: Email[];
};

function EmailBox({ sender, timestamp, subject }: EmailBoxProps) {
  return (
    <div className="bg-light-accent-hoverable email-nugget outlook-shadow">
      <div>{sender}</div>
      <div className="email-nugget-indent">{subject}</div>
      <div className="email-nugget-indent text-grey">
        {new Date(timestamp).toDateString()}
      </div>
    </div>
  );
}

const Home = ({ emails }: HomeProps) => {
  const router = useRouter();

  const handleSummarizeToday = () => {
    router.push("/summarizeToday");
  };
  const handleSummarizeWeek = () => {
    router.push("/summarizeWeek");
  };

  return (
    <main className="mx-0">
      <div className="inbox-header bg-light-accent outlook-shadow">
        <div className="inbox-name">Inbox</div>
        <button
          id="todayBttn"
          className="summary-buttons"
          onClick={handleSummarizeToday}
        >
          Summarize Today's Emails
        </button>
        <button
          id="weekBttn"
          className="summary-buttons"
          onClick={handleSummarizeWeek}
        >
          Summarize This Week's Emails
        </button>
      </div>
      <div id="EmailList">
        {emails.map((email) => (
          <EmailBox
            key={email._id}
            sender={email.sender}
            timestamp={email.timestamp}
            subject={email.subject}
          />
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let emails = await fetchAllEmails();
  const serializedEmails = emails.map((email: Email) => {
    const serializedEmail = { ...email, _id: email._id.toString() };
    return serializedEmail;
  });

  return { props: { emails: serializedEmails } };
};

export default Home;
