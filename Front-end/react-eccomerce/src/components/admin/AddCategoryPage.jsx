import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.createCategory({ name });
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
        <h2 className="text-2xl mb-2">Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 text-lg border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-[#1be96d] text-white text-lg py-3 px-5 rounded hover:bg-[#208d44] transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
