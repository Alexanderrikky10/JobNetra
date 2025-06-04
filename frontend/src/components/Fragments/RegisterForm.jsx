import { useContext } from "react";
import GeneralInput from "../Elements/GeneralInput/GeneralInput";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "../Elements/PasswordInput/PasswordInput";
import { DarkMode } from "../../context/DarkMode";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div className="flex-1/2 py-6 rounded-lg flex flex-col items-start lg:px-20 md:px-12 px-12">
      <h1
        className={`${
          isDarkMode ? "text-white" : ""
        } text-xl text-center font-bold mb-4 w-full`}
      >
        Welcome
      </h1>
      <form className="mb-5 w-full">
        <GeneralInput
          type="text"
          name="fullname"
          placeholder="John Doe"
          classGeneral="flex flex-col gap-1.5 mb-4"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold text-sm`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } border-2 border-gray-400 py-2 px-3 rounded-md text-sm`}
        >
          Full Name
        </GeneralInput>
        <GeneralInput
          type="email"
          name="email"
          placeholder="your@email.com"
          classGeneral="flex flex-col gap-1.5 mb-4"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold text-sm`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } border-2 border-gray-400 py-2 px-3 rounded-md text-sm`}
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
          } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10 text-sm`}
        >
          Password
        </PasswordInput>

        <PasswordInput
          name="confirmPassword"
          placeholder="*********"
          classGeneral="flex flex-col gap-1.5 mb-4"
          classLabel={`${isDarkMode ? "text-white" : ""} font-semibold text-sm`}
          classInput={`${
            isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
          } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10 text-sm`}
        >
          Confirm Password
        </PasswordInput>

        <div className="mb-5 w-fit">
          <GeneralInput
            type="checkbox"
            name="termsconditions"
            classGeneral="flex justify-center items-center gap-2 group"
            classLabel={`${
              isDarkMode
                ? "text-white hover:text-[var(--dark-hover)] group-hover:text-[var(--dark-hover)]"
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)] group-hover:text-[var(--primary-color)]"
            } order-1 font-medium text-sm`}
            classInput=""
          >
            I agree to the Terms of Service and Privacy Policy
          </GeneralInput>
        </div>
        <button
          className="w-full py-2 bg-[var(--primary-color)] text-sm rounded-lg text-white text-center font-semibold hover:bg-[var(--primary-hover)]"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="w-full self-center flex items-center mb-5 text-sm">
        <hr className=" flex-grow border-gray-500/30" />
        <p className="mx-2.5 text-[var(--text-secondary)]">Or continue with</p>
        <hr className="flex-grow border-gray-500/30" />
      </div>

      <button
        type="button"
        className={`w-full border-2 text-sm border-gray-400/20 py-2 rounded-lg flex items-center justify-center gap-3 hover:border-gray-400 hover:bg-gray-400 transition mb-5`}
      >
        <FaGoogle className="text-red-500 text-xl" />
        <span
          className={`${
            isDarkMode ? "text-white" : "text-gray-700"
          } font-medium`}
        >
          Sign up with Google
        </span>
      </button>

      {/* Login */}
      <p className="text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[var(--primary-color)] font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
