import React, { useContext } from "react";
import GeneralInput from "../Elements/GeneralInput/GeneralInput";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "../Elements/PasswordInput/PasswordInput";
import { DarkMode } from "../../context/DarkMode";

const LoginForm = () => {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div
      className={`${
        isDarkMode ? "bg-[var(--accent-dark)]" : "bg-white"
      } w-full px-8 py-6 rounded-lg flex flex-col items-start`}
    >
      <h1
        className={`${
          isDarkMode ? "text-white" : ""
        } text-2xl font-bold mb-4 w-full`}
      >
        Welcome Back
      </h1>
      <form className="mb-5 w-full">
        <GeneralInput
          type="email"
          name="email"
          placeholder="your@email.com"
          classGeneral="flex flex-col gap-1.5 mb-3"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } border-2 border-gray-400 py-2 px-3 rounded-md`}
        >
          Email Address
        </GeneralInput>

        <PasswordInput
          name="password"
          placeholder="*********"
          classGeneral="flex flex-col gap-1.5 mb-3"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10`}
        >
          Password
        </PasswordInput>

        <div className="flex justify-between mb-5">
          <GeneralInput
            type="checkbox"
            name="remember"
            classGeneral="flex justify-center items-center gap-2 group"
            classLabel={`${
              isDarkMode
                ? "text-white hover:text-[var(--dark-hover)] group-hover:text-[var(--dark-hover)]"
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)] group-hover:text-[var(--primary-color)]"
            } order-1 font-medium`}
            classInput=""
          >
            Remember Me
          </GeneralInput>

          <a
            className={` ${
              isDarkMode ? "text-white" : "text-[var(--primary-color)]"
            } font-semibold hover:underline`}
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <button
          className="w-full py-3 bg-[var(--primary-color)] rounded-lg text-white text-center font-semibold hover:bg-[var(--primary-hover)]"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <div className="w-full self-center flex items-center mb-5">
        <hr className=" flex-grow border-gray-500/30" />
        <p className="mx-2.5 text-[var(--text-secondary)]">Or continue with</p>
        <hr className="flex-grow border-gray-500/30" />
      </div>

      <button
        type="button"
        className={`w-full border-2 border-gray-400/20 py-3 rounded-lg flex items-center justify-center gap-3 hover:border-gray-400 hover:bg-gray-400 transition`}
      >
        <FaGoogle className="text-red-500 text-xl" />
        <span className={`${isDarkMode ? "text-white" : "text-gray-700"} font-medium`}>Sign in with Google</span>
      </button>
    </div>
  );
};

export default LoginForm;
