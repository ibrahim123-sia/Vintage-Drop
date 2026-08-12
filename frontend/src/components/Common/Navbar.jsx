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

  const navLink = "text-vintage-umber hover:text-vintage-gold text-xs uppercase tracking-widest font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-vintage-gold pb-1";

  return (
    <>
      <nav className="bg-vintage-cream sticky top-0 z-40 border-b border-vintage-sand/60 shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          {/* LEFT: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center space-x-3">
            <button onClick={toggleNavDrawer} className="md:hidden text-vintage-obsidian hover:text-vintage-gold p-1">
              <HiBars3BottomRight className="w-7 h-7" />
            </button>

            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-vintage-gold/50 shadow-sm bg-vintage-obsidian p-0.5 flex-shrink-0 group-hover:border-vintage-gold transition-all duration-300">
                <img src={logo} alt="The Vintage Drop" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl text-vintage-obsidian font-bold tracking-wider leading-none">
                  THE VINTAGE DROP
                </span>
                <span className="text-[10px] text-vintage-gold font-medium tracking-widest uppercase mt-0.5">
                  Antiques · Plants · Décor
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Inline Category Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
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

          {/* RIGHT: Search, User Profile, Admin, Cart */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="hidden md:block w-48 lg:w-56">
              <SearchBar />
            </div>

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="hidden sm:inline-block border border-vintage-gold text-vintage-gold hover:bg-vintage-gold hover:text-vintage-obsidian px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all duration-200"
              >
                Admin
              </Link>
            )}

            <Link to="/profile" className="text-vintage-obsidian hover:text-vintage-gold transition-colors duration-200 p-1" title="Account">
              <HiOutlineUser className="w-6 h-6" />
            </Link>

            <button onClick={toggleCartDrawer} className="relative text-vintage-obsidian hover:text-vintage-gold transition-colors duration-200 p-1" title="Bag">
              <HiOutlineShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vintage-gold text-vintage-obsidian text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Medium screens secondary nav bar */}
        <div className="hidden md:flex lg:hidden justify-center space-x-6 py-2.5 bg-vintage-sand/20 border-t border-vintage-sand/40">
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
