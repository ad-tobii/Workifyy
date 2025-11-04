import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Nav from "../../../Components/Nav"; // Keep your Nav if needed

const EditClientProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Simulate a current user (replace with real data source if needed)
  const currentUser = {
    firstname: "John",
    lastname: "Doe",
  };

  useEffect(() => {
    if (currentUser) {
      setValue("firstname", currentUser.firstname);
      setValue("lastname", currentUser.lastname);
    }
  }, [currentUser, setValue]);

  if (!currentUser) {
    return <p className="text-center p-8">Loading user data...</p>;
  }

  const onSubmit = (data) => {
    setIsLoading(true);

    // Simulate saving process
    setTimeout(() => {
      console.log("Profile updated:", data);
      alert("Profile updated successfully!");
      setIsLoading(false);
      navigate("/Dashboard/clientDashboard/profile");
    }, 1000);
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg p-8 space-y-8 bg-white shadow-xl rounded-xl">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Edit Your Profile
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                autoComplete="given-name"
                required
                {...register("firstname", { required: "First name is required" })}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  errors.firstname ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Your first name"
              />
              {errors.firstname && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                autoComplete="family-name"
                required
                {...register("lastname", { required: "Last name is required" })}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  errors.lastname ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Your last name"
              />
              {errors.lastname && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditClientProfile;
