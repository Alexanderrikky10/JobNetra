import { useContext } from "react";
import GeneralInput from "../Elements/GeneralInput/GeneralInput";
import { DarkMode } from "../../context/DarkMode";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";

const ForgotPasswordForm = (props) => {
  const { isDarkMode } = useContext(DarkMode);
  const {
    handleSubmitForgotPassword,
    control,
    errors,
    reset,
    isPendingForgotPassword,
    isSuccessForgotPassword,
    handleForgotPassword,
    isErrorForgotPassword,
    errorForgotPassword,
  } = props;
  return (
    <div className="flex-1/2 rounded-lg flex flex-col items-start justify-center">
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
        Forgot Password
      </h1>

      {/* Login Form */}
      <form
        className="mb-5 w-full"
        onSubmit={handleSubmitForgotPassword(handleForgotPassword)}
      >
        {isErrorForgotPassword && (
          <p className="text-red-500 mb-2 text-sm">
            {errorForgotPassword?.response?.data?.message}
          </p>
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <GeneralInput
              type="email"
              name="email"
              placeholder="your@email.com"
              classGeneral={`flex flex-col gap-1.5 ${
                errors?.email ? "mb-0" : "mb-4"
              }`}
              classLabel={`${
                isDarkMode ? "text-white" : ""
              } font-semibold text-sm`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } border-2 border-gray-400 py-1.5 px-3 rounded-md text-sm`}
              field={field}
            >
              Registered Email
            </GeneralInput>
          )}
        />
        {errors?.email && (
          <p className="text-red-500 mb-2 text-sm">{errors.email.message}</p>
        )}
        <button
          className="w-full py-2 bg-[var(--primary-color)] cursor-pointer rounded-lg text-white text-sm text-center font-semibold hover:bg-[var(--primary-hover)]"
          type="submit"
          disabled={isPendingForgotPassword || isSuccessForgotPassword}
        >
          {isPendingForgotPassword ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
      <p className="text-sm self-center">
        Back to{" "}
        <Link
          to="/login"
          className="text-[var(--primary-color)] font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
