import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from '../../assets/logo.jpeg';

const categoryLinks = [
  { label: "Indoor Plants", category: "Indoor Plants" },
  { label: "Vintage Planters", category: "Vintage Planters" },
  { label: "Succulents & Cacti", category: "Succulents & Cacti" },
  { label: "Antique Décor", category: "Antique Décor" },
  { label: "Curated Bundles", category: "Curated Bundles" },
  { label: "Wall Vases", category: "Wall Vases" },
];

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  const navLink = "text-vintage-umber hover:text-vintage-gold text-xs uppercase tracking-widest transition-colors duration-200 border-b border-transparent hover:border-vintage-gold pb-1";

  return (
    <>
      <nav className="bg-vintage-cream sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between py-5 px-6">
          <div className="flex-1">
            <button onClick={toggleNavDrawer} className="md:hidden text-vintage-umber hover:text-vintage-gold">
              <HiBars3BottomRight className="w-6 h-6" />
            </button>
          </div>

          <Link to="/" className="font-display text-2xl md:text-3xl text-vintage-obsidian tracking-widest">
            <img src={logo} alt="The Vintage Drop" style={{ height: "50px" }} />
          </Link>

          <div className="flex-1 flex items-center justify-end space-x-6">
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="hidden md:block border border-vintage-gold text-vintage-gold hover:bg-vintage-gold hover:text-vintage-obsidian px-3 py-1 rounded-sm text-xs uppercase tracking-widest transition-all duration-200"
              >
                Admin
              </Link>
            )}

            <Link to="/profile" className="text-vintage-umber hover:text-vintage-gold transition-colors duration-200">
              <HiOutlineUser className="w-5 h-5" />
            </Link>

            <button onClick={toggleCartDrawer} className="relative text-vintage-umber hover:text-vintage-gold transition-colors duration-200">
              <HiOutlineShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-vintage-gold text-vintage-obsidian text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="hidden md:flex justify-center flex-wrap gap-x-8 gap-y-2 pb-5">
          {categoryLinks.map((link) => (
            <Link
              key={link.category}
              to={`/collections/all?category=${encodeURIComponent(link.category)}`}
              className={navLink}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block max-w-md mx-auto pb-4 px-6">
          <SearchBar />
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation drawer */}
      <div
        className={`fixed top-0 left-0 w-4/5 sm:w-2/3 md:w-1/3 h-full bg-vintage-cream shadow-xl
        transform transition-all duration-300 ease-in-out z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-vintage-sand">
          <h3 className="font-display text-lg text-vintage-obsidian">Menu</h3>
          <button onClick={toggleNavDrawer} className="text-vintage-umber hover:text-vintage-gold">
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <SearchBar />
          </div>

          {user && user.role === "admin" && (
            <Link
              to="/admin"
              onClick={toggleNavDrawer}
              className="block w-full bg-vintage-obsidian text-vintage-cream px-4 py-2 rounded-sm text-sm uppercase tracking-widest mb-6 text-center"
            >
              Admin Dashboard
            </Link>
          )}

          <nav className="space-y-2">
            {categoryLinks.map((link) => (
              <Link
                key={link.category}
                to={`/collections/all?category=${encodeURIComponent(link.category)}`}
                onClick={toggleNavDrawer}
                className="block px-4 py-2 text-vintage-umber hover:text-vintage-gold hover:bg-vintage-sand/30 rounded-sm transition-colors duration-200 uppercase text-sm tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {navDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleNavDrawer} />
      )}
    </>
  );
};

export default Navbar;
