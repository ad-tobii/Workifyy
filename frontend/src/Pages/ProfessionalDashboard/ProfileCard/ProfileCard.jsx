 import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Rating from "../Rating/Rating";

const ProfileCard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const balance = 50000.99; // Example balance

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };
  const skills = [
    "Plumbing",
    "Water System Repair",
    "Emergency Services",
    "Pipe Installation",
  ]; // Example skills

  return (
    <div className="mr-12 h-[34rem] w-72 rounded-xl bg-[#1a1a1a] laptop:h-[13rem] desktop:ml-[2rem]">
      <div className="flex space-x-2 px-4 py-4">
        <div>
          <img
            src="/assets/black-worker.jpg"
            className="h-14 w-14 rounded-full object-cover"
            alt="Worker"
          />
        </div>
        <div className="flex flex-col space-y-2 text-white">
          <p className="text-xl underline hover:text-[#32cd32]">Adekeye O.</p>
          <p className="text-sm font-semibold">Plumber</p>
        </div>
      </div>
      <div className="flex justify-center laptop:hidden">
        <hr className="w-64 border-gray-500" />
      </div>

      <div className="flex justify-between px-4 py-4 text-[0.9rem] text-white laptop:hidden">
        <div className="space-y-2">
          <p>My level</p>
          <p>Success rate</p>
          <p>Avg rating</p>
        </div>
        <div className="space-y-2">
          <p>Skilled pro</p>
          <p>100%</p>
          <Rating />
        </div>
      </div>

      <div className="flex justify-center">
        <hr className="w-64 border-gray-500" />
      </div>
      <div className="flex justify-between px-4 py-2 text-[0.9rem] text-white">
        <div className="space-y-2">
          <p>Location</p>
          <p>Experience</p>
          <p>Completed Jobs</p>
        </div>
        <div className="space-y-2">
          <p>Fagge, Kano</p>
          <p>5+ years</p>
          <p>120 jobs</p>
        </div>
      </div>
      <div className="flex justify-center laptop:hidden">
        <hr className="w-64 border-gray-500" />
      </div>
      {/* Skills Section */}
      <div className="px-4 py-2 laptop:hidden">
        <p className="mb-2 text-[0.9rem] text-white">Skills</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-full bg-[#32cd32] px-3 py-1 text-[0.9rem] text-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center laptop:hidden">
        <hr className="w-64 border-gray-500" />
      </div>

      {/* Balance Section */}
      <div className="flex justify-between px-4 py-4 text-[0.9rem] text-white laptop:hidden">
        <p>Balance</p>
        <div className="flex items-center space-x-2">
          <p>{showBalance ? `₦${balance}` : "*****"}</p>
          <button onClick={toggleBalance} className="flex items-center">
            {showBalance ? (
              <EyeSlashIcon className="h-4 w-4 text-white" />
            ) : (
              <EyeIcon className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;