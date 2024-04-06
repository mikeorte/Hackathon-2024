import { GetServerSideProps } from "next";
import { fetchAllEmails } from "../lib/dbUtils";
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
    <div className="bg-light-accent-hoverable px-3 mb-3 py-2 rounded w-80 overflow-clip outlook-shadow">
      <div>{sender}</div>
      <div className="pl-4">{subject}</div>
      <div className="pl-4 text-grey">{new Date(timestamp).toDateString()}</div>
    </div>
  );
}

function Home({ emails }: HomeProps) {
  return (
    <main className="mx-0">
      <div className="py-2 my-3 pl-4 bg-light-accent rounded outlook-shadow flex flex-row">
        <div className="font-bold">Inbox</div>
        <button id="todayBttn" className="summary-buttons rounded mx-5 px-2">
          Summarize Today's Emails
        </button>
        <button
          id="weekBttn"
          className="summary-buttons rounded px-2 justify-self-end"
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
}

export const getServerSideProps: GetServerSideProps = async () => {
  let emails = await fetchAllEmails();
  const serializedEmails = emails.map((email: Email) => {
    const serializedEmail = { ...email, _id: email._id.toString() };
    return serializedEmail;
  });

  return { props: { emails: serializedEmails } };
};

export default Home;
