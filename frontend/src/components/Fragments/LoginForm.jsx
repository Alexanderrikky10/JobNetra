import React from "react";
import GeneralInput from "../Elements/GeneralInput/GeneralInput";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "../Elements/PasswordInput/PasswordInput";

const LoginForm = () => {
  return (
    <div className="w-full px-8 bg-[var(--accent-light)] py-6 rounded-lg flex flex-col items-start">
      <h1 className="text-2xl font-bold mb-4 w-full">Welcome Back</h1>
      <form className="mb-5 w-full">
        <GeneralInput
          type="email"
          name="email"
          placeholder="your@email.com"
          classGeneral="flex flex-col gap-1.5 mb-3"
          classLabel=" font-semibold"
          classInput="border-2 border-gray-400 py-2 px-3 rounded-md"
        >
          Email Address
        </GeneralInput>

        <PasswordInput
          name="password"
          placeholder="*********"
          classGeneral="flex flex-col gap-1.5 mb-3"
          classLabel=" font-semibold"
          classInput="w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10"
        >
          Password
        </PasswordInput>

        <div className="flex justify-between mb-5">
          <GeneralInput
            type="checkbox"
            name="remember"
            classGeneral="flex justify-center items-center gap-2"
            classLabel="text-[var(--text-secondary)] order-1"
            classInput=""
          >
            Remember Me
          </GeneralInput>

          <a
            className="text-[var(--primary-color)] font-semibold hover:underline"
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
        className="w-full border-2 border-gray-400/20 py-3 rounded-lg flex items-center justify-center gap-3 hover:border-gray-400 transition"
      >
        <FaGoogle className="text-red-500 text-xl" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default LoginForm;
