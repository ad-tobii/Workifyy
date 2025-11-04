import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("password");

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password would be updated successfully (mock)");
      reset();
    }, 1000); // Simulate async behavior
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl mt-8">
      <h3 className="text-2xl font-semibold text-center text-gray-800">
        Change Password
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="currentPassword_change"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            id="currentPassword_change"
            type="password"
            required
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className={`mt-1 input-class ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.currentPassword && (
            <p className="error-text">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password_change"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="password_change"
            type="password"
            required
            {...register("password", {
              required: "New password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
            className={`mt-1 input-class ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="passwordConfirm_change"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="passwordConfirm_change"
            type="password"
            required
            {...register("passwordConfirm", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className={`mt-1 input-class ${
              errors.passwordConfirm ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.passwordConfirm && (
            <p className="error-text">{errors.passwordConfirm.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .input-class {
          appearance: none;
          border-radius: 0.375rem;
          display: block;
          width: 100%;
          padding: 0.75rem;
          border-width: 1px;
          color: #111827;
        }
        .input-class:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px #6366f1;
        }
        .error-text {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}
