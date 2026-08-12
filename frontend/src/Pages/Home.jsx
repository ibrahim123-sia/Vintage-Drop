import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Product/GenderCollectionSection";
import NewArrivals from "../components/Product/NewArrivals";
import ProductDetails from "../components/Product/ProductDetail";
import ProductGrid from "../components/Product/ProductGrid";
import FeaturedCollection from "../components/Product/FeaturedCollection";
import FeaturesSection from "../components/Product/FeaturesSection";
import PlantCareSection from "../components/Common/PlantCareSection";
import TestimonialsSection from "../components/Common/TestimonialsSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        if (response.data && response.data._id) {
          setBestSellerProduct(response.data);
        }
      } catch (err) {
        console.error("Best seller fetch error:", err);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="bg-vintage-cream">
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      <div className="text-center py-4">
        <h2 className="font-display text-3xl md:text-4xl text-vintage-obsidian mb-2 font-bold">Customer Favorite</h2>
        <div className="vintage-divider my-2">
          <span className="vintage-divider-mark">🌸</span>
        </div>
      </div>

      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <ProductDetails productId={products?.[0]?._id || "vtd-plnt-001"} />
      )}

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-vintage-obsidian font-bold">Trending Collection</h2>
          <p className="text-vintage-umber/70 text-sm mt-2">Discover curated plant and planter pairings for your home.</p>
        </div>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <PlantCareSection />
      <FeaturedCollection />
      <TestimonialsSection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
