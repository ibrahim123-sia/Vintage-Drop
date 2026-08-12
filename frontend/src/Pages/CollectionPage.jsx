import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Product/FilterSidebar";
import SortOptions from "../components/Product/SortOptions";
import ProductGrid from "../components/Product/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const pageTitle = queryParams.category || queryParams.occasion || "All Products";

  return (
    <div className="flex flex-col lg:flex-row bg-vintage-cream min-h-screen">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border border-vintage-sand p-3 flex justify-center items-center text-vintage-umber uppercase text-sm tracking-widest"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      <div
        ref={sidebarRef}
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed inset-y-0 z-50 left-0 w-72 bg-vintage-cream overflow-y-auto transition-transform duration-300
          lg:static lg:translate-x-0 lg:flex-shrink-0 lg:w-80 p-4
        `}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4 sm:p-8">
        <h2 className="font-display text-2xl text-vintage-obsidian mb-4">{pageTitle}</h2>
        <SortOptions />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
