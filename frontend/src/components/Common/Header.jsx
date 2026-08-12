import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <Navbar />
    </header>
  );
};

export default Header;
