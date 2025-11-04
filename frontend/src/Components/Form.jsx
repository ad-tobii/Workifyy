import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; 
import toast from 'react-hot-toast'; // For toast notifications

const Form = ({role}) => {
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    setIsLoading(true);

    // Simulate async signup behavior
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Signup successful! (mock)");
      console.log("Form Data Submitted:", formData);
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col bg-black p-4 text-white">
      <section className="mt-[10rem] flex flex-col items-center">
        <article className="w-full max-w-[40rem] rounded-sm border-t-4 border-t-[#32cd32] bg-zinc-900 p-6">
          <header className="pb-3 text-center font-semibold  text-[2rem]">
            {role === "professional"
              ? "Sign up to get the work you love"
              : "Sign up to hire professionals"}
          </header>

          <div className="mb-4 flex flex-col space-y-2">
            <button
              type="button"
              className="rounded bg-[#32cd32] px-4 py-2 text-white hover:bg-green-500"
            >
              Continue with Google
            </button>
          </div>
          <div className="mb-4 flex items-center">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex space-x-4">
              <div className="flex w-1/2 flex-col">
                <label htmlFor="firstname" className="mb-1">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  className="rounded border-none bg-[#323439] p-2 text-[#32cd32] focus:outline-none focus:outline-[#32cd32]"
                  {...register("firstname", { required: "First name is required" })}
                />
                {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
              </div>

              <div className="flex w-1/2 flex-col">
                <label htmlFor="lastname" className="mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  className="rounded border-none bg-[#323439] p-2 text-[#32cd32] focus:outline-none focus:outline-[#32cd32]"
                  {...register("lastname", { required: "Last name is required" })}
                />
                {errors.lastname && <p className="text-sm text-red-500">{errors.lastname.message}</p>}
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="rounded bg-[#323439] p-2 text-[#32cd32] focus:outline-none focus:outline-[#32cd32]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="password" className="mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="rounded border-none bg-[#323439] p-2 text-[#32cd32] focus:outline-none focus:outline-[#32cd32]"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="termsCheckbox"
                className="mr-2 accent-[#32cd32]"
                {...register("terms", { required: "You must agree to the terms" })}
              />
              <label htmlFor="termsCheckbox" className="text-gray-400">
                Yes, I understand and agree to the
                <a href="#" className="text-green-500"> Workifyy Terms of Service</a>,
                <a href="#" className="text-green-500"> User Agreement</a> and
                <a href="#" className="text-green-500"> Privacy Policy</a>.
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

            <button
              type="submit"
              className="w-full rounded bg-[#32cd32] py-2 text-white hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create my account"}
            </button>

            <p className="mt-4 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-green-500">Log In</Link>
            </p>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Form;
