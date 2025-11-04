import React from "react";

const JobLocationTimingForm = ({ formData, handleChange, onNext, onBack }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ [name]: value });
  };

  const handleImmediateChange = () => {
    handleChange({
      isImmediate: !formData.isImmediate,
      startDate: "",
      deadline: "",
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">Location & Date</h2>

      <label className="mb-2 block text-white">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="mb-4 w-full rounded bg-[#323232] p-2 text-white focus:outline-none focus:ring focus:ring-[#32cd32]"
      />

      <label className="mb-2 block text-white">
        <input
          type="checkbox"
          checked={formData.isImmediate}
          onChange={handleImmediateChange}
          className="mr-2 accent-[#32cd32]"
        />
        Immediate Service <span className="text-[#32cd32]"> (Today)</span>
      </label>

      {!formData.isImmediate && (
        <>
          <label className="mb-2 block text-white">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mb-4 w-full rounded bg-[#323232] p-2 text-gray-400 accent-[#32cd32] focus:outline-none focus:ring focus:ring-[#32cd32]"
          />

          <label className="mb-2 block text-white">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="mb-4 w-full rounded bg-[#323232] p-2 text-gray-400 focus:outline-none focus:ring focus:ring-[#32cd32]"
          />
        </>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded bg-zinc-800 p-2 px-4 text-white"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="rounded bg-[#32cd32] p-2 px-4 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobLocationTimingForm;
