import RegisterForm from "../../components/Fragments/RegisterForm";
import AuthLayout from "../../components/Layouts/AuthLayout";
import useRegister from "./useRegister";

const RegisterPage = () => {
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
  } = useRegister();
  return (
    <div className="absolute inset-4 border-4 border-zinc-300 rounded-2xl flex items-center h-max">
      <AuthLayout>
        <RegisterForm
          handleRegister={handleRegister}
          handleSubmitRegister={handleSubmitRegister}
          control={control}
          errors={errors}
          reset={reset}
          isPendingRegister={isPendingRegister}
          isSuccessRegister={isSuccessRegister}
          isErrorRegister={isErrorRegister}
          errorRegister={errorRegister}
        />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
