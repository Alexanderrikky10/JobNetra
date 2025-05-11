import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { FiSunrise } from "react-icons/fi";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const AuthLayout = (props) => {
  const { children } = props;
  const pathname = useLocation().pathname;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  return (
    <div className="max-w-lg w-full min-h-screen flex justify-center items-center flex-col gap-5">
      <button
        className={`${
          isDarkMode
            ? "hover:bg-[#26374d] bg-[#151f2b]"
            : "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
        } absolute top-5 right-5 py-2 px-5 rounded-lg`}
        type="button"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <BsMoonFill className="text-white text-xl" />
        ) : (
          <BsSunFill className="text-white text-xl" />
        )}
      </button>
      <div
        className={`${
          isDarkMode ? "bg-[var(--accent-dark)]" : "bg-[var(--accent-light)]"
        }  p-2 flex gap-2 w-full rounded-lg`}
      >
        <Link
          className={`${
            pathname === "/login"
              ? "bg-[var(--primary-color)] text-white cursor-default"
              : `${
                  isDarkMode ? "text-white" : "text-[var(--text-secondary)]"
                } hover:text-[var(--primary-hover)] hover:bg-gray-400/50 font-semibold`
          } rounded-lg py-3 px-10 flex-1/2 block text-center font-bold`}
          to="/login"
        >
          Login
        </Link>
        <Link
          className={`${
            pathname === "/register"
              ? "bg-[var(--primary-color)] text-white cursor-default"
              : `${
                  isDarkMode ? "text-white" : "text-[var(--text-secondary)]"
                } hover:text-[var(--primary-hover)] hover:bg-gray-400/50 font-semibold`
          } py-3 px-10 flex-1/2 block rounded-lg text-center font-bold`}
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
