import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productSlice";
import axios from "axios";

const CATEGORIES = [
  "Indoor Plants",
  "Vintage Planters",
  "Succulents & Cacti",
  "Antique Décor",
  "Curated Bundles",
  "Wall Vases & Hangings"
];

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    material: [],
    occasion: [],
    color: [],
    size: [],
    collections: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        ...selectedProduct,
        material: selectedProduct.material || [],
        occasion: selectedProduct.occasion || [],
        color: selectedProduct.color || [],
        size: selectedProduct.size || [],
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleListChange = (field) => (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [field]: e.target.value.split(",").map((item) => item.trim()).filter(Boolean),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  const formWrapper = "w-full max-w-5xl bg-white p-8 rounded-sm border border-vintage-sand mx-auto";
  const inputClass = "w-full p-3 border border-vintage-sand rounded-sm focus:outline-none focus:ring-1 focus:ring-vintage-gold focus:border-vintage-gold transition duration-200 bg-vintage-cream";
  const buttonPrimary = "w-full bg-vintage-obsidian hover:bg-vintage-gold text-vintage-cream p-3 rounded-sm font-medium uppercase text-sm tracking-widest transition duration-200";
  const labelClass = "block text-sm font-medium mb-2 text-vintage-umber";
  const errorClass = "text-red-600 mb-4 text-sm p-2 bg-red-50 rounded-sm";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vintage-gold"></div>
      </div>
    );
  }

  if (error) {
    return <div className={errorClass}>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-vintage-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className={formWrapper}>
        <h2 className="font-display text-2xl text-vintage-obsidian mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" value={productData.description} onChange={handleChange} className={inputClass} rows={4} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Price (Rs.)</label>
              <input type="number" name="price" value={productData.price} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Count in Stock</label>
              <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>SKU</label>
              <input type="text" name="sku" value={productData.sku} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <select name="category" value={productData.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Collection</label>
              <input type="text" name="collections" value={productData.collections || ""} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Brand</label>
              <input type="text" name="brand" value={productData.brand || ""} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Material (comma-separated)</label>
              <input
                type="text"
                value={productData.material.join(", ")}
                onChange={handleListChange("material")}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Occasion (comma-separated)</label>
              <input
                type="text"
                value={productData.occasion.join(", ")}
                onChange={handleListChange("occasion")}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Color (comma-separated)</label>
              <input
                type="text"
                value={productData.color.join(", ")}
                onChange={handleListChange("color")}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Size (comma-separated)</label>
              <input
                type="text"
                value={productData.size.join(", ")}
                onChange={handleListChange("size")}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Upload Image</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-vintage-sand/40 hover:bg-vintage-sand text-vintage-umber px-4 py-2 rounded-sm transition duration-200">
                Choose File
                <input type="file" onChange={handleImageUpload} className="hidden" />
              </label>
              {uploading && <span className="text-vintage-gold text-sm">Uploading...</span>}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {productData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={image.altText || "Product Image"}
                    className="w-24 h-24 object-cover rounded-sm border border-vintage-sand"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className={buttonPrimary} disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
