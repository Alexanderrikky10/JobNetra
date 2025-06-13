import ForgotPasswordForm from "../../components/Fragments/ForgotPasswordForm";
import AuthLayout from "../../components/Layouts/AuthLayout";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
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
  } = useForgotPassword();
  return (
    <div className="rounded-2xl py-4 flex items-center h-lvh min-h-120">
      <AuthLayout>
        <ForgotPasswordForm
          handleSubmitForgotPassword={handleSubmitForgotPassword}
          control={control}
          errors={errors}
          isErrorForgotPassword={isErrorForgotPassword}
          reset={reset}
          isPendingForgotPassword={isPendingForgotPassword}
          isSuccessForgotPassword={isSuccessForgotPassword}
          handleForgotPassword={handleForgotPassword}
          errorForgotPassword={errorForgotPassword}
        />
      </AuthLayout>
    </div>
  );
};

export default ForgotPassword;
