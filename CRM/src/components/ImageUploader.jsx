import React, { useState } from "react";


const ImageUploader = ({setNewStaff, newStaff, imageKey}) => {
  const [imageURL, setImageURL] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shop-software"); // Replace with your unsigned preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/djkckaixl/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImageURL(data.secure_url);
      setNewStaff({
        ...newStaff,
        [imageKey] : data.secure_url

      })
      console.log("Uploaded Image URL:", data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleImageUpload} />
      {imageURL && (
        <div className="mt-4">
          <p>Uploaded Image URL:</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer">
            {imageURL}
          </a>
          <br />
          <img src={imageURL} alt="Uploaded" width={300} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
