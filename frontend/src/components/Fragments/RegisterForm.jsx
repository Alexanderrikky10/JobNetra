import { useContext } from "react";
import GeneralInput from "../Elements/GeneralInput/GeneralInput";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "../Elements/PasswordInput/PasswordInput";
import { DarkMode } from "../../context/DarkMode";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";

const RegisterForm = (props) => {
  const {
    handleSubmitRegister,
    control,
    errors,
    reset,
    isPendingRegister,
    isSuccessRegister,
    handleRegister,
    isErrorRegister,
    errorRegister,
  } = props;
  console.log(errorRegister);
  const { isDarkMode } = useContext(DarkMode);
  return (
    <div className="flex-1/2 rounded-lg flex flex-col items-start justify-center">
      <h1
        className={`${
          isDarkMode ? "text-white" : ""
        } text-xl text-center font-bold mb-5 w-full 2xl:text-3xl`}
      >
        Welcome
      </h1>
      <form
        className="mb-5 w-full"
        onSubmit={handleSubmitRegister(handleRegister)}
      >
        {isErrorRegister && (
          <p className="text-red-500 mb-2 text-sm lg:text-md 2xl:text-xl">
            {errorRegister?.response?.data?.message}
          </p>
        )}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <GeneralInput
              type="text"
              name="name"
              placeholder="John Doe"
              field={field}
              classGeneral={`flex flex-col gap-1.5 ${
                errors?.name ? "mb-0" : "mb-4"
              }`}
              classLabel={`${
                isDarkMode ? "text-white" : ""
              } font-semibold text-sm lg:text-md 2xl:text-xl`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } border-2 border-gray-400 py-2 px-3 rounded-md text-sm lg:text-md 2xl:text-xl`}
            >
              Full Name
            </GeneralInput>
          )}
        />
        {errors?.name && (
          <p className="text-red-500 mb-2 text-sm lg:text-md 2xl:text-xl">
            {errors.name.message}
          </p>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <GeneralInput
              type="email"
              name="email"
              field={field}
              placeholder="your@email.com"
              classGeneral={`flex flex-col gap-1.5 ${
                errors?.email ? "mb-0" : "mb-4"
              }`}
              classLabel={`${
                isDarkMode ? "text-white" : ""
              } font-semibold text-sm lg:text-md 2xl:text-xl`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } border-2 border-gray-400 py-2 px-3 rounded-md text-sm lg:text-md 2xl:text-xl`}
            >
              Email Address
            </GeneralInput>
          )}
        />
        {errors?.email && (
          <p className="text-red-500 mb-2 text-sm">{errors.email.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              name="password"
              placeholder="*********"
              field={field}
              classGeneral={`flex flex-col gap-1.5 ${
                errors?.password ? "mb-0" : "mb-4"
              }`}
              classLabel={`${
                isDarkMode ? "text-white" : ""
              } font-semibold text-sm lg:text-md 2xl:text-xl`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10 text-sm lg:text-md 2xl:text-xl`}
            >
              Password
            </PasswordInput>
          )}
        />
        {errors?.password && (
          <p className="text-red-500 mb-2 text-sm lg:text-md 2xl:text-xl">
            {errors.password.message}
          </p>
        )}

        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <PasswordInput
              name="password_confirmation"
              placeholder="*********"
              field={field}
              classGeneral={`flex flex-col gap-1.5 ${
                errors?.password_confirmation ? "mb-0" : "mb-4"
              }`}
              classLabel={`${
                isDarkMode ? "text-white" : ""
              } font-semibold text-sm lg:text-md 2xl:text-xl`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10 text-sm lg:text-md 2xl:text-xl`}
            >
              Password Confirmation
            </PasswordInput>
          )}
        />
        {errors?.password_confirmation && (
          <p className="text-red-500 mb-2 text-sm lg:text-md 2xl:text-xl">
            {errors.password_confirmation.message}
          </p>
        )}

        <div className="mb-5 w-fit">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <GeneralInput
                type="checkbox"
                name="terms"
                field={field}
                classGeneral="flex justify-center items-center gap-2 group"
                classLabel={`${
                  isDarkMode
                    ? "text-white hover:text-[var(--dark-hover)] group-hover:text-[var(--dark-hover)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--primary-color)] group-hover:text-[var(--primary-color)]"
                } order-1 font-medium text-sm lg:text-md 2xl:text-xl`}
                classInput=""
              >
                I agree to the Terms of Service and Privacy Policy
              </GeneralInput>
            )}
          />
          {errors?.terms && (
            <p className="text-red-500 mb-2 text-sm lg:text-md 2xl:text-xl">
              {errors.terms.message}
            </p>
          )}
        </div>
        <button
          className="w-full py-2 bg-[var(--primary-color)] text-sm lg:text-md 2xl:text-xl rounded-lg text-white text-center font-semibold hover:bg-[var(--primary-hover)]"
          type="submit"
          disabled={isPendingRegister || isSuccessRegister}
        >
          {isSuccessRegister ? (
            "Register Successful"
          ) : isPendingRegister ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      {/* <div className="w-full self-center flex items-center mb-5 text-sm">
        <hr className=" flex-grow border-gray-500/30" />
        <p className="mx-2.5 text-[var(--text-secondary)]">Or continue with</p>
        <hr className="flex-grow border-gray-500/30" />
      </div> */}

      {/* <button
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
      </button> */}

      {/* Login */}
      <p className="text-sm lg:text-md 2xl:text-xl">
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
