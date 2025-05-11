import React from "react";
import { Link, useLocation } from "react-router-dom";

const AuthLayout = (props) => {
  const { children } = props;
  const pathname = useLocation().pathname;
  return (
    <div className="max-w-lg w-full min-h-screen flex justify-center items-center flex-col gap-5">
      <div className="bg-[var(--accent-light)] p-2 flex gap-2 w-full rounded-lg">
        <Link
          className={`${
            pathname === "/login"
              ? "bg-[var(--primary-color)] text-white cursor-default"
              : "text-[var(--text-secondary)] hover:text-[var(--primary-hover)] font-semibold"
          } rounded-lg py-3 px-10 flex-1/2 block text-center`}
          to="/login"
        >
          Login
        </Link>
        <Link
          className={`${
            pathname === "/register"
              ? "bg-[var(--primary-color)] text-white cursor-default"
              : "text-[var(--text-secondary)] hover:text-[var(--primary-hover)] font-semibold"
          } py-3 px-10 flex-1/2 block rounded-lg text-center`}
          to="/register"
        >
          Register
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
