import React from "react";
import Navbar from "../Fragments/Navbar";

const NavLayout = (props) => {
  const { children } = props;
  return (
    <div className="container max-w-10/12 min-h-screen relative mx-auto">
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default NavLayout;
