import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let allProducts = [];
        const queryparams = new URLSearchParams(location.search);
        const keyword = queryparams.get("search");
        const brand = queryparams.get("brand");
        const color = queryparams.get("color");
        const sort = queryparams.get("sort");

        if (keyword) {
          const response = await ApiService.searchProducts(keyword);
          allProducts = response.productList || [];
        } else {
          const response = await ApiService.getAllProducts();
          allProducts = response.productList || [];
        }

        const colors = [
          ...new Set(allProducts.map((product) => product.color)),
        ];
        const brands = [
          ...new Set(allProducts.map((product) => product.brand)),
        ];
        const categories = [
          ...new Set(allProducts.map((product) => product.category)),
        ];

        setAvailableColors(colors);
        setAvailableBrands(brands);
        setAvailableCategories(categories);

        let filtered = allProducts;

        if (brand) {
          filtered = filtered.filter((product) => product.brand === brand);
        }

        if (color) {
          filtered = filtered.filter((product) => product.color === color);
        }

        // Sort by price
        if (sort === "low-to-high") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "high-to-low") {
          filtered.sort((a, b) => b.price - a.price);
        }

        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setProducts(allProducts);
        setFilteredProducts(filtered);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to fetch products"
        );
      }
    };

    fetchProducts();
  }, [location.search]);

  const applyFilters = (brand, color, sortOption) => {
    const queryparams = new URLSearchParams(location.search);

    if (brand) {
      queryparams.set("brand", brand);
    } else {
      queryparams.delete("brand");
    }

    if (color) {
      queryparams.set("color", color);
    } else {
      queryparams.delete("color");
    }

    if (sortOption) {
      queryparams.set("sort", sortOption);
    } else {
      queryparams.delete("sort");
    }

    navigate({
      search: queryparams.toString(),
    });
  };

  const handleSortByPrice = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    applyFilters(
      new URLSearchParams(location.search).get("brand"),
      new URLSearchParams(location.search).get("color"),
      selectedOption
    );
  };

  const handleColorSelection = (color) => {
    const queryparams = new URLSearchParams(location.search);
    const selectedColor = queryparams.get("color") === color ? "" : color;
    applyFilters(queryparams.get("brand"), selectedColor, sortOption);
  };

  const handleBrandSelection = (brand) => {
    const queryparams = new URLSearchParams(location.search);
    const selectedBrand = queryparams.get("brand") === brand ? "" : brand;
    applyFilters(selectedBrand, queryparams.get("color"), sortOption);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-gray-100 dark:bg-white p-4 shadow-md">
        {/* Sort by Price */}
        <div className="mb-6 border border-gray-300 rounded-md p-2">
          <h2 className="font-bold text-lg mb-4">Sort by Price</h2>
          <select
            value={sortOption}
            onChange={handleSortByPrice}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="mb-6 border border-gray-300 rounded-md p-2">
          <h2 className="font-bold text-lg mb-4">Color</h2>
          <ul className="space-y-2">
            {availableColors.map((color, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={color}
                  onChange={() => handleColorSelection(color)}
                  checked={
                    new URLSearchParams(location.search).get("color") === color
                  }
                  className="mr-2 w-4 h-4"
                />
                <label
                  htmlFor={color}
                  className="capitalize text-gray-700 text-sm"
                >
                  {color}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Filter */}
        <div className="border border-gray-300 rounded-md p-2">
          <h2 className="font-bold text-lg mb-4">Brand</h2>
          <ul className="space-y-2">
            {availableBrands.map((brand, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={brand}
                  onChange={() => handleBrandSelection(brand)}
                  checked={
                    new URLSearchParams(location.search).get("brand") === brand
                  }
                  className="mr-2 w-4 h-4"
                />
                <label
                  htmlFor={brand}
                  className="capitalize text-gray-700 text-sm"
                >
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full md:w-5/6 p-4">
        {error ? (
          <p className="text-center text-red-600 text-xl mt-5">{error}</p>
        ) : (
          <div>
            <ProductList
              products={filteredProducts.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )}
            />
            <div className="flex justify-center mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
