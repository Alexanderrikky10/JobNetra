// import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
// import { DarkMode } from "../../context/DarkMode";
// import { FiSunrise } from "react-icons/fi";
// import { BsMoonFill, BsSunFill } from "react-icons/bs";

const AuthLayout = (props) => {
  const { children } = props;
  const pathname = useLocation().pathname;
  // const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <div className="flex w-full bg-white rounded-xl h-full justify-center md:flex-row flex-col-reverse border-4 border-zinc-300 mx-5 my-2 px-5 gap-2 py-6 lg:px-16 lg:gap-4">
      {pathname === "/login" && children}
      {pathname === "/register" && children}
      {pathname === "/forgot-password" && children}
      {pathname === "/reset-password" && children}
      <div className="lg:w-full w-2/3 flex self-center rounded-xl flex-1/2 my-auto">
        <img
          src="images/login-register.jpg"
          alt=""
          className="w-full align-middle my-auto"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
