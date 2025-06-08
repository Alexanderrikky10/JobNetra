import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import PasswordInput from "../Elements/PasswordInput/PasswordInput";

const ResetPasswordForm = (props) => {
  const { isDarkMode } = useContext(DarkMode);
  const {
    handleSubmitResetPassword,
    control,
    errors,
    reset,
    isPendingResetPassword,
    isSuccessResetPassword,
    handleResetPassword,
    isErrorResetPassword,
    errorResetPassword,
  } = props;
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
        Reset Password
      </h1>

      {/* Login Form */}
      <form
        className="mb-5 w-full"
        onSubmit={handleSubmitResetPassword(handleResetPassword)}
      >
        {isErrorResetPassword && (
          <p className="text-red-500 mb-2 text-sm">
            {errorResetPassword?.response?.data?.message}
          </p>
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
              } font-semibold text-sm`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10 text-sm`}
            >
              Password
            </PasswordInput>
          )}
        />
        {errors?.password && (
          <p className="text-red-500 mb-2 text-sm">{errors.password.message}</p>
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
              } font-semibold text-sm`}
              classInput={`${
                isDarkMode ? "text-white bg-[var(--bg-dark)]" : ""
              } w-full border-2 border-gray-400 py-2 px-3 rounded-md pr-10 text-sm`}
            >
              Password Confirmation
            </PasswordInput>
          )}
        />
        {errors?.password_confirmation && (
          <p className="text-red-500 mb-2 text-sm">
            {errors.password_confirmation.message}
          </p>
        )}
        <button
          className="w-full py-2 bg-[var(--primary-color)] cursor-pointer rounded-lg text-white text-sm text-center font-semibold hover:bg-[var(--primary-hover)]"
          type="submit"
          disabled={isPendingResetPassword || isSuccessResetPassword}
        >
          {isSuccessResetPassword ? (
            "Reset Password Successful"
          ) : isPendingResetPassword ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
