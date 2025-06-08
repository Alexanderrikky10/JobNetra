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
    <div className="absolute inset-4 border-4 border-zinc-300 rounded-2xl flex items-center md:h-auto h-max ">
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
