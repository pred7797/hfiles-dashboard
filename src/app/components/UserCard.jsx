import { currentUser } from "@clerk/nextjs/server";

export default async function UserCard() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-lg border border-gray-200 mt-8 w-[400px]">
      <img
        src={user.imageUrl}
        alt={`${user.firstName} ${user.lastName}'s profile picture`}
        className="w-20 h-20 rounded-full"
      />
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-zinc-600">
          Email: {user.emailAddresses[0]?.emailAddress}
        </p>
        <p className="text-zinc-600">
          Phone: {user.phoneNumbers[0]?.phoneNumber || "Not available"}
        </p>
      </div>
    </div>
  );
}
