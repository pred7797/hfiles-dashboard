import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserCard from "./components/UserCard";
import FileSubmission from "./components/FileSubmission";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center flex-col justify-center bg-white text-zinc-800">
      <SignedOut>
        <h1 className="text-center font-normal">
          Welcome, sign in to see your profile
        </h1>
      </SignedOut>
      <SignedIn>
        <div className="flex gap-8 items-start w-full justify-center">
          <UserCard />
          <FileSubmission />
        </div>
      </SignedIn>
    </main>
  );
}
