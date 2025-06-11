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
    <div className="rounded-2xl py-4 flex items-center h-lvh min-h-120">
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
