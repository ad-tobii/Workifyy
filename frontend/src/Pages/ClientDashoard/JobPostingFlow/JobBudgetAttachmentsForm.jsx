import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobBudgetAttachmentsForm = ({ formData, handleChange, onBack }) => {
  const [formattedPrice, setFormattedPrice] = useState(formData.budget || "");
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle budget input separately to format it
    if (name === "budget") {
      const formattedValue = formatCurrency(value);
      setFormattedPrice(formattedValue);
      handleChange({ budget: unformatCurrency(formattedValue) }); // Save the raw number without commas
    } else {
      handleChange({ [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleChange({ images: files });

    if (files) {
      const fileArray = Array.from(files);
      const filePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(filePreviews);
    }
  };

  // Format number with commas every 3 digits
  const formatCurrency = (value) => {
    const cleanedValue = value.replace(/\D/g, ""); // Remove non-digits
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
  };

  // Remove commas for backend
  const unformatCurrency = (value) => value.replace(/,/g, "");

  const navigate = useNavigate();
  const handlePost = () => {
    alert("Job posted !");
    navigate("/dashboard/clientdashboard");
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">Offer & Attachments</h2>

      {/* Budget input with Naira symbol */}
      <label className="mb-2 block text-white">Offer</label>
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">₦</span>
        <input
          type="text"
          name="budget"
          value={formattedPrice}
          onChange={handleInputChange}
          className="w-full rounded bg-[#323232] p-2 pl-8 text-white focus:outline-none focus:ring focus:ring-[#32cd32]"
          placeholder="Enter your offer"
        />
      </div>

      {/* Attach Images input */}
      <label className="mb-2 block text-white">Attach Images</label>
      <div className="mb-4">
        <label className="block cursor-pointer rounded bg-[#32cd32] p-2 text-center text-white">
          Choose Images
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      {/* Display selected images */}
      {imagePreviews.length > 0 && (
        <div className="mb-4 mt-5 flex flex-wrap">
          {imagePreviews.map((image, index) => (
            <div key={index} className="mb-2 mr-2">
              <img
                src={image}
                alt={`Preview ${index}`}
                className="h-16 w-16 rounded object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Back and Submit buttons */}
      <div className="flex justify-between">
        <button onClick={onBack} className="rounded bg-zinc-800 p-2 px-4 text-white">
          Back
        </button>
        <button type="button" onClick={handlePost} className="rounded bg-[#32cd32] p-2 text-white">
          Post Job +
        </button>
      </div>
    </div>
  );
};

export default JobBudgetAttachmentsForm;
