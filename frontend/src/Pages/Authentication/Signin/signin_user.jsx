import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormNav from "../../../Components/FormNav";

export const Signin = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Login submitted:", data);
    alert(`Email: ${data.email}\nPassword: ${data.password}`);
  };

  return (
    <main>
      <header>
        <FormNav />
      </header>

      <section className="justify-center pt-[6rem] text-white desktop:flex desktop:justify-center largeDesktop:flex">
        <img
          className="mt-12 h-[25rem] xsMobile:hidden miniMobile:hidden mobile:hidden miniTablet:hidden tablet:hidden miniLaptop:hidden laptop:hidden desktop:h-[22rem]"
          src="/assets/login-svg.svg"
          alt="Login illustration"
        />
        <article className="flex items-center justify-center">
          <div className="d rounded-sm border-t-[0.3rem] border-t-[#32cd32] bg-zinc-900 p-8 xsMobile:w-[90%] miniMobile:w-[90%] mobile:w-[90%] miniTablet:w-[90%] tablet:w-[90%] miniLaptop:w-[90%] laptop:w-full laptop:max-w-md">
            <h2 className="mb-6 text-center text-2xl font-bold">Log in to Workifyy</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded bg-[#323439] px-4 py-2 text-green-600 focus:outline-none focus:ring focus:ring-green-600"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email format",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full rounded bg-[rgb(254,254,255)] px-4 py-2 text-green-600 focus:outline-none focus:ring focus:ring-green-600"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="mb-4 w-full rounded bg-[#32cd32] py-2 font-bold text-white hover:bg-green-700"
              >
                Continue
              </button>

              <div className="mb-4 flex items-center justify-between">
                <hr className="w-full border-gray-600" />
                <span className="mx-2 text-gray-400">or</span>
                <hr className="w-full border-gray-600" />
              </div>

              <button
                type="button"
                className="mb-4 w-full rounded bg-black py-2 font-bold text-white hover:bg-gray-700"
              >
                Continue with Google
              </button>

              <footer className="my-6 flex content-center items-center justify-center gap-2">
                <hr className="w-[5rem] border-gray-600" />
                <p className="text-[.8rem] text-gray-400">
                  Don't have a Workifyy account?
                </p>
                <hr className="w-[5rem] border-gray-600" />
              </footer>

              <Link to="/auth/signup">
                <button
                  type="button"
                  className="w-full rounded bg-[#32cd32] py-2 font-bold text-white hover:bg-green-700"
                >
                  Sign Up
                </button>
              </Link>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Signin;
