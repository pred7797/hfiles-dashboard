"use client";

import { useState } from "react";
import supabase from "../../supabase-client";
import { useUser } from "@clerk/nextjs";

export default function FileSubmission() {
  const { user } = useUser();
  const [fileType, setFileType] = useState("lab-report");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!file) {
      setStatus("Please select a file.");
      return;
    }
    // Upload file to Supabase Storage
    const filePath = `${Date.now()}_${file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from("user-files")
      .upload(filePath, file);
    if (storageError) {
      setStatus("File upload failed: " + storageError.message);
      return;
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("user-files")
      .getPublicUrl(filePath);
    const fileUrl = publicUrlData?.publicUrl;
    const userId = user?.id;
    // Debug log before insert
    console.log({ file_type: fileType, file_url: fileUrl, user_id: userId });
    // Insert metadata into user_files table
    const { error: dbError } = await supabase.from("user_files").insert([
      { file_type: fileType, file_url: fileUrl, user_id: userId },
    ]);
    if (dbError) {
      setStatus("Database insert failed: " + dbError.message);
      return;
    }
    setStatus("File uploaded successfully!");
    setFile(null);
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 mt-8 w-[400px]">
      <h2 className="mb-4">File Submission</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileType" className="block mb-2">
            File Type
          </label>
          <select
            id="fileType"
            name="fileType"
            className="w-full p-2 rounded border border-gray-300"
            value={fileType}
            onChange={e => setFileType(e.target.value)}
          >
            <option value="lab-report">Lab Report</option>
            <option value="prescription">Prescription</option>
            <option value="x-ray">X-Ray</option>
            <option value="blood-report">Blood Report</option>
            <option value="mri-scan">MRI Scan</option>
            <option value="ct-scan">CT Scan</option>
          </select>
        </div>
        <div>
          <label htmlFor="fileUpload" className="block mb-2">
            Upload File
          </label>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            className="w-full p-2 rounded border border-gray-300"
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white border-none rounded cursor-pointer"
        >
          Submit
        </button>
        {status && <div className="mt-2 text-sm">{status}</div>}
      </form>
    </div>
  );
} 

