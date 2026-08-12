import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-vintage-cream">
      {/* Mobile top bar */}
      <div className="flex md:hidden p-4 bg-vintage-obsidian text-vintage-cream z-20 items-center">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 font-display text-xl">Admin Dashboard</h1>
      </div>

      {/* Sidebar overlay (mobile) */}
      {isSliderOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-vintage-obsidian w-64 min-h-screen text-vintage-cream absolute md:relative transform
          ${isSliderOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
