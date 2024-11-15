import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to fetch categories"
      );
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  return (
    <div className="max-w-2xl mx-auto p-5 rounded-lg shadow-lg">
      {error ? (
        <p className="text-red-500 text-center text-xl mt-5">{error}</p>
      ) : (
        <div>
          <h2 className="font-bold text-2xl mb-5 text-center text-gray-800">
            Categories
          </h2>
          <ul className="list-none p-0 flex flex-wrap gap-5 justify-center">
            {categories.map((category) => (
              <li key={category.id} className="flex-initial w-full sm:w-1/3">
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full p-4 text-lg bg-[#81a0a6] text-white rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-gray-500"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default CategoryListPage;
