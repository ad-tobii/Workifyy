import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../Header/Navbar";
import DashboardFooter from "../Footer/Footer";
import ChangePasswordForm from "../../../Components/ChangePasswordForm";
import toast from "react-hot-toast";

const ProfessionalProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock current user (replace with real user if needed)
  const currentUser = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    role: "professional",
    photo: "/assets/default-avatar.png",
  };

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'professional') {
      toast.error("Access denied.");
      navigate('/');
      return;
    }

    // Simulate fetching profile (frontend-only)
    setTimeout(() => {
      const mockProfile = {
        tagline: "Expert Web Developer",
        experience: 5,
        expertise: ["Web Development", "UI/UX Design", "SEO"],
        location: "Lagos",
        photo: "/assets/default-avatar.png",
        Bio: "Passionate developer with a focus on creating amazing web experiences.",
        user: currentUser
      };
      setProfile(mockProfile);
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading profile...
      </div>
    );
  }

  const displayUser = profile?.user || currentUser;
  const displayPhoto = profile?.photo || displayUser?.photo || "/assets/default-avatar.png";

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="p-4 sm:p-8 text-white max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8">
            <div className="relative mb-4 sm:mb-0">
              <img
                src={displayPhoto}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-indigo-600"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">
                {displayUser?.firstname} {displayUser?.lastname}
              </h1>
              <p className="text-lg text-indigo-300">{profile?.tagline || "No tagline set"}</p>
              <Link 
                to="/Dashboard/ProfessionalDashboard/profile/edit" 
                className="inline-block mt-2 px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Bio Section */}
        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-indigo-400">Bio</h2>
          <p className="text-gray-300 whitespace-pre-line">{profile.Bio || "No bio provided."}</p>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Skills and Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-indigo-400">Skills</h2>
            {profile.expertise && profile.expertise.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.expertise.map((skill) => (
                  <span key={skill} className="bg-indigo-500 text-white px-3 py-1 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            ) : <p className="text-gray-400">No skills listed.</p>}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-indigo-400">Details</h2>
            <ul className="space-y-2 text-gray-300">
              <li><span className="font-semibold text-indigo-300">Experience:</span> {profile.experience ?? 'N/A'} years</li>
              <li><span className="font-semibold text-indigo-300">Location:</span> {profile.location || "N/A"}</li>
              <li><span className="font-semibold text-indigo-300">Email:</span> {displayUser?.email}</li>
            </ul>
          </div>
        </div>

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

export default ProfessionalProfile;
