import React from "react";

const ImageUploader = ({ setNewStaff, newStaff, imageKey }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shop-software");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djkckaixl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      // ✅ Safely update the parent state
      setNewStaff((prev) => ({
        ...prev,
        [imageKey]: data.secure_url,
      }));
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center w-full p-4">
        <label
          htmlFor={`file-upload-${imageKey}`}
          className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gradient-to-b from-white to-gray-50
            hover:from-white hover:to-gray-100 hover:border-gray-400
            focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
            transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-4 text-gray-500 transition-colors duration-300 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p className="mb-2 text-base font-semibold text-gray-600 group-hover:text-blue-700 transition-colors duration-300">
              <span className="underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF, PDF (MAX. 5MB)
            </p>
          </div>
          <input
            id={`file-upload-${imageKey}`}
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            accept=".png,.jpg,.jpeg,.gif,.pdf"
          />
        </label>
      </div>

      {newStaff[imageKey] && (
        <div className="mt-4">
          <img src={newStaff[imageKey]} alt="Uploaded" width={300} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
