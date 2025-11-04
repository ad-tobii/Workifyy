import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardFooter from "./DashboardFooter";
import ChangePasswordForm from "../../Components/ChangePasswordForm";

const ClientProfile = () => {
  // Temporary mock user data (replace with real API or context later)
  const currentUser = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    role: "Client",
    photo: "/assets/default-avatar.png",
  };

  const profileImage = currentUser.photo || "/assets/default-avatar.png";

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      <div className="p-4 sm:p-8 text-white max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8">
            {/* Profile Picture */}
            <div className="relative mb-4 sm:mb-0">
              <img
                src={profileImage}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-indigo-600"
              />
            </div>

            {/* Client Info */}
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">
                {currentUser.firstname} {currentUser.lastname}
              </h1>
              <p className="text-indigo-200 text-lg">{currentUser.email}</p>
              <Link
                to="/Dashboard/clientDashboard/profile/edit"
                className="inline-block mt-2 px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-indigo-400">
              Account Details
            </h2>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-indigo-300">Role:</span>{" "}
                {currentUser.role}
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-indigo-400">
              Activity (Placeholder)
            </h2>
            <p className="text-gray-400">No recent activity to display.</p>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Change Password Form */}
        <div className="mt-8">
          <ChangePasswordForm />
        </div>
      </div>

      <div className="mt-auto pt-10">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default ClientProfile;
