import LoginForm from "../../components/Fragments/LoginForm";
import AuthLayout from "../../components/Layouts/AuthLayout";
import useLogin from "./useLogin";

const LoginPage = () => {
  const {
    handleSubmitLogin,
    control,
    errors,
    reset,
    isPendingLogin,
    isSuccessLogin,
    handleLogin,
    isErrorLogin,
    errorLogin,
  } = useLogin();
  return (
    <div className="rounded-2xl py-4 flex items-center h-lvh min-h-120">
      <AuthLayout>
        <LoginForm
          handleSubmitLogin={handleSubmitLogin}
          control={control}
          errors={errors}
          isErrorLogin={isErrorLogin}
          reset={reset}
          isPendingLogin={isPendingLogin}
          isSuccessLogin={isSuccessLogin}
          handleLogin={handleLogin}
          errorLogin={errorLogin}
        />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
