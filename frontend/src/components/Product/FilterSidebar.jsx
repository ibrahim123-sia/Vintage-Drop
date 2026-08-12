import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: "",
    occasion: "",
    material: [],
    color: [],
    size: [],
    minPrice: 0,
    maxPrice: 6000,
  });
  const [priceRange, setPriceRange] = useState([0, 6000]);

  const categories = [
    "Indoor Plants",
    "Vintage Planters",
    "Succulents & Cacti",
    "Antique Décor",
    "Curated Bundles",
    "Wall Vases & Hangings",
  ];
  const occasions = ["Victorian", "Art Deco", "Rustic", "Bohemian", "Mid-Century", "Minimalist", "Shabby Chic"];
  const materials = [
    "Ceramic",
    "Porcelain",
    "Terracotta",
    "Brass",
    "Clay",
    "Glass",
    "Wood",
    "Concrete",
  ];
  const colors = ["White", "Blue & White", "Multicolor", "Earthy Tones", "Gold", "Green", "Terracotta", "Black"];
  const sizes = ["Small (Under 6\")", "Medium (6-12\")", "Large (Over 12\")"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || "",
      occasion: params.occasion || "",
      material: params.material ? params.material.split(",") : [],
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 6000,
    });
    setPriceRange([0, params.maxPrice || 6000]);
  }, [searchParams]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const newFilters = { ...filter };

    if (checked) {
      newFilters[name] = [...(newFilters[name] || []), value];
    } else {
      newFilters[name] = newFilters[name].filter((item) => item !== value);
    }

    setFilter(newFilters);
    updateURLParams(newFilters);
  };

  const handleSingleSelect = (name, value) => {
    const newFilters = { ...filter, [name]: value };
    setFilter(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filter, minPrice: 0, maxPrice: newPrice };
    setFilter(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const FilterSection = ({ title, children }) => (
    <div className="mb-8 pb-6 border-b border-vintage-sand last:border-0">
      <h4 className="text-xs font-semibold text-vintage-umber uppercase tracking-widest mb-4">
        {title}
      </h4>
      {children}
    </div>
  );

  const radioOption = (selected) =>
    `flex items-center justify-center h-4 w-4 rounded-full border ${
      selected ? "border-vintage-gold bg-vintage-gold" : "border-vintage-sand"
    }`;

  const chipOption = (selected) =>
    `px-3 py-1.5 text-xs rounded-sm border transition-all ${
      selected
        ? "bg-vintage-obsidian text-vintage-cream border-vintage-obsidian"
        : "bg-white text-vintage-umber border-vintage-sand hover:border-vintage-gold"
    }`;

  return (
    <div className="p-6 bg-white rounded-sm border border-vintage-sand">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-xl text-vintage-obsidian">Filters</h3>
        <button
          onClick={() => {
            setFilter({
              category: "",
              occasion: "",
              material: [],
              color: [],
              size: [],
              minPrice: 0,
              maxPrice: 6000,
            });
            setPriceRange([0, 6000]);
            navigate(window.location.pathname);
          }}
          className="text-xs uppercase tracking-widest text-vintage-gold hover:text-vintage-umber"
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Category">
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleSingleSelect("category", category)}
            >
              <div className={radioOption(filter.category === category)}>
                {filter.category === category && <div className="h-2 w-2 rounded-full bg-vintage-obsidian"></div>}
              </div>
              <span className="text-sm text-vintage-umber">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Style">
        <div className="space-y-3">
          {occasions.map((occasion) => (
            <label
              key={occasion}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleSingleSelect("occasion", occasion)}
            >
              <div className={radioOption(filter.occasion === occasion)}>
                {filter.occasion === occasion && <div className="h-2 w-2 rounded-full bg-vintage-obsidian"></div>}
              </div>
              <span className="text-sm text-vintage-umber">{occasion}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Material">
        <div className="flex flex-wrap gap-2">
          {materials.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="material"
                value={option}
                checked={filter.material.includes(option)}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <span className={chipOption(filter.material.includes(option))}>{option}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="space-y-3">
          {colors.map((color) => (
            <label key={color} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                name="color"
                value={color}
                checked={filter.color.includes(color)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-vintage-gold focus:ring-vintage-gold border-vintage-sand rounded"
              />
              <span className="text-sm text-vintage-umber">{color}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <label key={size} className="flex items-center justify-center cursor-pointer">
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filter.size.includes(size)}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <div className={`w-full py-2 text-center text-sm rounded-sm border ${
                filter.size.includes(size)
                  ? "border-vintage-gold bg-vintage-sand/40 text-vintage-obsidian"
                  : "border-vintage-sand hover:border-vintage-gold text-vintage-umber"
              }`}>
                {size}
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="6000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-1.5 bg-vintage-sand rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-vintage-gold"
          />
          <div className="flex justify-between mt-3 text-sm text-vintage-umber/70">
            <span>Rs. 0</span>
            <span>Rs. {priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;
