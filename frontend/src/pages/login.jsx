import LoginForm from "../components/Fragments/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const LoginPage = () => {
  return (
    <div className="absolute inset-4 border-4 border-zinc-300 rounded-2xl flex items-center md:h-auto h-max ">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
