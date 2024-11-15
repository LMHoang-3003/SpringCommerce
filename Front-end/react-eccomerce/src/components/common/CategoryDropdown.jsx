import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ApiService from "../../service/ApiService";

const CategoriesDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.getAllCategory(); // Hàm này sẽ gọi API để lấy danh sách categories
        setCategories(response.data); // Đảm bảo cấu trúc dữ liệu đúng
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative">
      <button className="font-bold block py-2 px-3 text-white rounded hover:bg-gray-100 md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white ml-8">
        Categories
      </button>
      <ul className="absolute left-0 mt-2 hidden bg-white shadow-lg rounded-lg z-10 group-hover:block">
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/category/${category.id}`} // Điều chỉnh đường dẫn dựa trên cấu trúc API
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesDropdown;
