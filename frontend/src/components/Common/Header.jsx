import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="border-b border-vintage-sand">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
