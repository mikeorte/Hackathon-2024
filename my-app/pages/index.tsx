import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Home Page with Outlook</h1>
      <p>We are The Winners!</p>
      <Link href="/create-meeting">
        <button>Create a Meeting</button>
      </Link>
    </div>
  );
}
