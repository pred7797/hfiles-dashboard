"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import supabase from "../../supabase-client";

export default function UserCard() {
  const { user, isLoaded } = useUser();
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  // Fetch gender from DB on load
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("gender")
          .eq("user_id", user.id)
          .single();
        if (data && data.gender) {
          setGender(data.gender);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-lg border border-gray-200 mt-8 w-full max-w-[400px]">
      <img
        src={user.imageUrl}
        alt={`${user.firstName} ${user.lastName}'s profile picture`}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
      />
      <div className="text-center sm:text-left w-full">
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-zinc-600">
          Email: {user.emailAddresses[0]?.emailAddress}
        </p>
        <p className="text-zinc-600">
          Phone: {user.phoneNumbers[0]?.phoneNumber || "Not available"}
        </p>
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="block text-zinc-600 mb-1">Gender:</span>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="mr-1"
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="mr-1"
            />
            Female
          </label>
        </div>
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          onClick={async () => {
            setStatus("Updating...");
            const userId = user.id;
            const { error } = await supabase
              .from("users")
              .upsert([
                {
                  user_id: userId,
                  user_first_name: user.firstName,
                  user_last_name: user.lastName,
                  email_id: user.emailAddresses[0]?.emailAddress,
                  phone_no: user.phoneNumbers[0]?.phoneNumber || null,
                  gender: gender,
                },
              ], { onConflict: "user_id" });
            if (error) {
              setStatus("Update failed: " + error.message);
            } else {
              setStatus("User info updated!");
            }
          }}
        >
          Update
        </button>
        {status && <div className="mt-2 text-sm">{status}</div>}
      </div>
    </div>
  );
}
