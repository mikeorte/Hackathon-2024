import Image from "next/image";
import Summary from "../../pages/api/summary/page";

function EmailBox(props: any) {
  let sender = props.sender;
  let recipient = props.recipient;
  let timestamp = props.timestamp;
  let subject = props.subject;
  let body = props.body;

  return (
    <div className="bg-light-accent-hoverable email-nugget outlook-shadow">
      <div>
        {sender}
      </div>
      <div className="email-nugget-indent">
        {subject}
      </div>
      <div className="email-nugget-indent text-grey">
        {new Date(timestamp).toDateString()}
      </div>
    </div>
  )
}


export default function Inbox(props: any) {
  let emails: any[] = props.emails;

  if (emails === undefined || emails.length === 0) {
    emails = [{
      sender: "placeholder@sender.com",
      recipient: "placeholder@recipient.com",
      timestamp: "2024-04-04T08:30:00",
      subject: "Placeholder Subject",
      body: "Placeholder Body"
    },{
      sender: "placeholder@sender.com",
      recipient: "placeholder@recipient.com",
      timestamp: "2024-04-04T08:30:00",
      subject: "Placeholder Subject",
      body: "Placeholder Body"
    },{
      sender: "placeholder@sender.com",
      recipient: "placeholder@recipient.com",
      timestamp: "2024-04-04T08:30:00",
      subject: "Placeholder Subject",
      body: "Placeholder Body"
    }];
  }

  return (
    <main className="">
      <div className="inbox-header bg-light-accent outlook-shadow">
        <div className="font-bold">Inbox</div>
        <button id="todayBttn" className="summary-buttons">Summarize Today's Emails</button>
        <button id="weekBttn" className="summary-buttons">Summarize This Week's Emails</button>
      </div>
      <div id="EmailList">
        {emails.map((email) => (
          <EmailBox sender={email.sender} timestamp={email.timestamp} subject={email.subject} />
        ))}
      </div>
    </main>
  );
}
