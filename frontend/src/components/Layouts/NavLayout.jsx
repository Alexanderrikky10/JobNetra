import React from "react";
import Navbar from "../Fragments/Navbar";

const NavLayout = (props) => {
  const { children } = props;
  return (
    <div className="min-h-screen relative mx-auto">
      <Navbar />
      <div className="pt-10">{children}</div>
    </div>
  );
};

export default NavLayout;
