"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "../../supabase-client";

export default function UserFiles() {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) {
        setFiles([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("user_files")
        .select("id, file_type, file_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        setFiles([]);
      } else {
        setFiles(data);
      }
      console.log(data)
      setLoading(false);
    };
    fetchFiles();
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 w-3/4">
      <h3 className="mb-4 text-lg font-semibold">Your Uploaded Files</h3>
      {loading ? (
        <div>Loading...</div>
      ) : files.length === 0 ? (
        <div>No files uploaded yet.</div>
      ) : (
        <ul className="flex flex-wrap gap-4 justify-center">
          {files.map((file) => (
            <li key={file.id} className="flex flex-col items-center border rounded-lg p-2 mb-4 w-48 shadow bg-white">
              <div className="w-40 h-32 flex items-center justify-center border mb-2 bg-gray-50 rounded">
                {/(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.bmp|\.svg)$/i.test(file.file_url) ? (
                  <img
                    src={file.file_url}
                    alt={file.file_type}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-500 text-center">Preview not available</span>
                )}
              </div>
              <button
                className="w-full py-1 mb-1 bg-yellow-300 text-black rounded font-semibold"
                onClick={() => window.open(file.file_url, '_blank')}
              >
                View
              </button>
              <button
                className="w-full py-1 bg-blue-800 text-white rounded font-semibold"
                onClick={async () => {
                  const path = file.file_url.split("/user-files/")[1];
                  await supabase.storage.from("user-files").remove([path]);
                  await supabase.from("user_files").delete().eq("id", file.id);
                  setFiles((prev) => prev.filter((f) => f.id !== file.id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 