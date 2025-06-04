import { useContext } from "react";
import GeneralInput from "../Elements/GeneralInput/GeneralInput";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "../Elements/PasswordInput/PasswordInput";
import { DarkMode } from "../../context/DarkMode";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div className="flex-1/2 py-6 rounded-lg flex flex-col items-start justify-center lg:px-20 md:px-12 px-12">
      {/* Logo */}
      {/* <div className="mb-7">
        <p>JobNetra</p>
      </div> */}

      {/* Welcome Back */}
      <h1
        className={`${
          isDarkMode ? "text-white" : ""
        } text-xl text-center font-bold mb-5 w-full`}
      >
        Welcome Back
      </h1>

      {/* Login Form */}
      <form className="mb-5 w-full">
        <GeneralInput
          type="email"
          name="email"
          placeholder="your@email.com"
          classGeneral="flex flex-col gap-1.5 mb-4"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold text-sm`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } border-2 border-gray-400 py-1.5 px-3 rounded-md text-sm`}
        >
          Email Address
        </GeneralInput>

        <PasswordInput
          name="password"
          placeholder="*********"
          classGeneral="flex flex-col gap-1.5 mb-4"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold text-sm`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } w-full border-2 border-gray-400 py-1.5 px-3 rounded-md pr-10 text-sm`}
        >
          Password
        </PasswordInput>

        <div className="flex justify-between mb-5">
          <GeneralInput
            type="checkbox"
            name="remember"
            classGeneral="flex justify-center items-center gap-2 group text-sm"
            classLabel={`${
              isDarkMode
                ? "text-white hover:text-[var(--dark-hover)] group-hover:text-[var(--dark-hover)]"
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)] group-hover:text-[var(--primary-color)]"
            } order-1 font-medium text-sm`}
            classInput=""
          >
            Remember Me
          </GeneralInput>

          {/* Forgot Password */}
          <a
            className={` ${
              isDarkMode ? "text-white" : "text-[var(--primary-color)]"
            } font-semibold hover:underline text-sm`}
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign In */}
        <button
          className="w-full py-2 bg-[var(--primary-color)] cursor-pointer rounded-lg text-white text-sm text-center font-semibold hover:bg-[var(--primary-hover)]"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <div className="w-full self-center flex items-center mb-5">
        <hr className=" flex-grow border-gray-500/30" />
        <p className="mx-2.5 text-sm text-[var(--text-secondary)]">
          Or continue with
        </p>
        <hr className="flex-grow border-gray-500/30" />
      </div>

      {/* Sign in with Google */}
      <button
        type="button"
        className={`w-full border-2 cursor-pointer border-gray-400/20 mb-4 py-2 rounded-lg flex items-center justify-center gap-3 hover:border-gray-400 hover:bg-gray-400 transition`}
      >
        <FaGoogle className="text-red-500 text-xl" />
        <span
          className={`${
            isDarkMode ? "text-white" : "text-gray-700"
          } font-medium text-sm`}
        >
          Sign in with Google
        </span>
      </button>

      {/* Don't have an account? */}
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-[var(--primary-color)] font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
