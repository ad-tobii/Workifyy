import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#323232",
    borderColor: "#32cd32",
    color: "#fff",
    padding: "0.5rem",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#323232",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#32cd32" : "#323232",
    color: state.isSelected ? "#000" : "#fff",
    padding: "0.5rem",
    cursor: "pointer",
  }),
};

const options = [
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "carpentry", label: "Carpentry" },
  { value: "painting", label: "Painting" },
  { value: "cleaning", label: "Cleaning" },
  { value: "gardening", label: "Gardening" },
  { value: "tiling", label: "Tiling" },
  { value: "roofing", label: "Roofing" },
  { value: "flooring", label: "Flooring" },
  { value: "plastering", label: "Plastering" },
];

const JobTitleCategoryForm = ({ formData, handleChange, onNext }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedCategories([...selectedCategories, selectedOption]);
      handleChange({ categories: [...selectedCategories, selectedOption] });
    }
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.value !== categoryToRemove.value
    );
    setSelectedCategories(updatedCategories);
    handleChange({ categories: updatedCategories });
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold text-white">Job Details</h2>

      {/* Job Title */}
      <label className="mb-2 block text-white">Job Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="mb-4 w-full rounded bg-[#323232] p-2 text-white focus:outline-none focus:ring focus:ring-[#32cd32]"
        placeholder="Enter job title"
      />

      {/* Job Category Dropdown */}
      <div className="mb-4">
        <label className="mb-2 block text-white">Job Category</label>
        <Select
          options={options}
          styles={customStyles}
          placeholder="Select job category"
          onChange={handleCategoryChange}
          isClearable
          isSearchable
          value={null}
        />
      </div>

      {/* Display selected categories */}
      {selectedCategories.length > 0 && (
        <div className="mb-4 mt-4 flex flex-wrap">
          {selectedCategories.map((category, index) => (
            <div
              key={index}
              className="mb-2 mr-2 flex items-center rounded-full bg-[#32cd32] px-3 py-1 text-sm text-black"
            >
              {category.label}
              <button
                onClick={() => removeCategory(category)}
                className="ml-2 text-black"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Job Description */}
      <label className="mb-2 block text-white">Job Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="mb-4 w-full rounded bg-[#323232] p-2 text-white focus:outline-none focus:ring focus:ring-[#32cd32]"
        placeholder="Enter job description"
      />

      {/* Next Button */}
      <button
        onClick={onNext}
        className="rounded bg-[#32cd32] p-2 px-4 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default JobTitleCategoryForm;
