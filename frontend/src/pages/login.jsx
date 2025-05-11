import React from "react";
import LoginForm from "../components/Fragments/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const LoginPage = () => {
  return (
    <div className="w-full flex justify-center items-center px-3">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
