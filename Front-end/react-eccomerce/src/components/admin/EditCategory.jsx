import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
const EditCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory(categoryId);
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const response = await ApiService.getCategoryById(categoryId);
      setName(response.category.name);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to get a category by id"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.updateCategory(categoryId, { name });
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/categories");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to save a category"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-5 border border-gray-300 rounded-md">
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="text-2xl mb-2">Edit Category</h2>
        <input
          className="p-2 mb-2 text-lg border border-gray-300 rounded"
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#221be9] text-white text-lg py-3 px-5 rounded hover:bg-[#111348] transition-colors"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
