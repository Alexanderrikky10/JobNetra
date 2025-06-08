import ResetPasswordForm from "../../components/Fragments/ResetPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout";
import useResetPassword from "./useResetPassword";

const ResetPassword = () => {
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
  } = useResetPassword();
  return (
    <div className="absolute inset-4 border-4 border-zinc-300 rounded-2xl flex items-center md:h-auto h-max ">
      <AuthLayout>
        <ResetPasswordForm
          handleSubmitResetPassword={handleSubmitResetPassword}
          control={control}
          errors={errors}
          isErrorResetPassword={isErrorResetPassword}
          reset={reset}
          isPendingResetPassword={isPendingResetPassword}
          isSuccessResetPassword={isSuccessResetPassword}
          handleResetPassword={handleResetPassword}
          errorResetPassword={errorResetPassword}
        />
      </AuthLayout>
    </div>
  );
};

export default ResetPassword;
