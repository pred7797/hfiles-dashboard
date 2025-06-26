export default function FileSubmission() {
  return (
    <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 mt-8 w-[400px]">
      <h2 className="mb-4">File Submission</h2>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="fileType" className="block mb-2">
            File Type
          </label>
          <select
            id="fileType"
            name="fileType"
            className="w-full p-2 rounded border border-gray-300"
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
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white border-none rounded cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
} 