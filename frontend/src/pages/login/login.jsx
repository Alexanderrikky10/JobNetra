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
    <div className="absolute inset-4 border-4 border-zinc-300 rounded-2xl flex items-center md:h-auto h-max ">
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
