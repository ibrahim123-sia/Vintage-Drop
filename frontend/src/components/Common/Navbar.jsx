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

  const navLink = "text-vintage-umber hover:text-vintage-gold text-xs uppercase tracking-wider font-semibold transition-all duration-200 border-b-2 border-transparent hover:border-vintage-gold pb-0.5 whitespace-nowrap";

  return (
    <>
      <div className="bg-vintage-obsidian text-vintage-cream text-[11px] py-1.5 px-4 text-center font-semibold uppercase tracking-widest border-b border-vintage-gold/20">
        Free Shipping Across Pakistan on Orders Over Rs. 2,000 · Cash on Delivery
      </div>
      <nav className="bg-vintage-cream/95 backdrop-blur-md border-b border-vintage-sand/50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-8">
          {/* LEFT: Logo + Brand Name (Locked 1 Line) */}
          <div className="flex items-center space-x-3 shrink-0">
            <button onClick={toggleNavDrawer} className="lg:hidden text-vintage-obsidian hover:text-vintage-gold p-1" aria-label="Toggle Menu">
              <HiBars3BottomRight className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
              <img src={logo} alt="The Vintage Drop" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-vintage-gold/60 shadow-sm group-hover:scale-105 transition-transform duration-300" />
              <span className="font-display text-base sm:text-xl font-bold tracking-widest text-vintage-obsidian uppercase whitespace-nowrap">
                The Vintage Drop
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Category Links */}
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

          {/* RIGHT: Search, Profile & Cart Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:block w-44 md:w-52">
              <SearchBar />
            </div>

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="hidden sm:inline-block bg-vintage-obsidian text-vintage-gold hover:bg-vintage-gold hover:text-vintage-obsidian px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-sm"
              >
                Admin
              </Link>
            )}

            <Link to="/profile" className="text-vintage-obsidian hover:text-vintage-gold transition-colors duration-200 p-1.5 rounded-full hover:bg-vintage-sand/30" title="Account">
              <HiOutlineUser className="w-5 h-5" />
            </Link>

            <button onClick={toggleCartDrawer} className="relative text-vintage-obsidian hover:text-vintage-gold transition-colors duration-200 p-1.5 rounded-full hover:bg-vintage-sand/30" title="Bag">
              <HiOutlineShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-vintage-gold text-vintage-obsidian text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
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
