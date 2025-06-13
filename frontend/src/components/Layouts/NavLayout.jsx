import React from "react";
import Navbar from "../Fragments/Navbar";
import FooterLayout from "./FooterLayout";

const NavLayout = (props) => {
  const { children } = props;
  return (
    <div className="min-h-screen relative mx-auto">
      <Navbar />
      <div className="pt-10">{children}</div>
      <FooterLayout />
    </div>
  );
};

export default NavLayout;
