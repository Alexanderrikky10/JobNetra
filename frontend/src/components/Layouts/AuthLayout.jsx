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
    <div className="flex w-full bg-white rounded-xl h-full justify-center md:flex-row flex-col-reverse">
      {pathname === "/login" && children}
      {pathname === "/register" && children}
      {pathname === "/forgot-password" && children}
      {pathname === "/reset-password" && children}
      <div className="lg:w-full w-2/3 bg-zinc-300 self-center rounded-xl flex-1/2 my-auto">
        <img
          src="images/login-register.jpg"
          alt=""
          className="w-full align-middle"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
