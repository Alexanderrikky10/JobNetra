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
    <div className="rounded-2xl py-4 flex items-center min-h-160 xl:min-h-full h-lvh">
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
