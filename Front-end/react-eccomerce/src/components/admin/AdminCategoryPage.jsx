import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (error) {
      console.log("Error fetching category list", error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/admin/edit-category/${id}`);
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this category? ");
    if (confirmed) {
      try {
        await ApiService.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.log("Error deleting category by id");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <h2 className="text-2xl font-semibold mb-5">Categories</h2>
        <button
          className="bg-[#1be96d] text-white text-lg px-4 py-2 rounded hover:bg-[#208d44] transition-colors mb-4 absolute top-5 right-6 "
          onClick={() => navigate("/admin/add-category")}
        >
          Add Category
        </button>
        <ul className="list-none">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between p-2 border border-gray-300 rounded mb-2"
            >
              <span className="text-gray-700">{category.name}</span>
              <div className="flex space-x-2">
                <button
                  className="bg-[#4731ec] text-white px-4 py-1 rounded hover:bg-[#3a26ac] transition-colors"
                  onClick={() => handleEdit(category.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-[#ef1b1b] text-white px-4 py-1 rounded hover:bg-red-800 transition-colors"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
