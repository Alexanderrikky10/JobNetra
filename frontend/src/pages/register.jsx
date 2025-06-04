import AuthLayout from "../components/Layouts/AuthLayout";
import RegisterForm from "../components/Fragments/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="absolute inset-4 border-4 border-zinc-300 rounded-2xl flex items-center h-max">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
