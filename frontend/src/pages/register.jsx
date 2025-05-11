import React from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import RegisterForm from "../components/Fragments/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="w-full flex justify-center items-center px-3 py-10">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
