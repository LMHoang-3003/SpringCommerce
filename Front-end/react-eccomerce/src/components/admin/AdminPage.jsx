import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-52 flex flex-col items-center">
      <h1 className="mb-5 text-3xl font-bold">Welcome Admin</h1>
      <button
        className="m-2 p-5 text-xl font-bold rounded-lg bg-[#81a0a6] text-white hover:bg-[#4d5f63] transition-colors duration-300 w-1/3"
        onClick={() => navigate("/admin/categories")}
      >
        Manage Categories
        <img
          className="h-8 w-8 rounded inline-block ml-5"
          src="./categories.png"
          alt=""
        />
      </button>
      <button
        className="m-2 p-5 text-xl font-bold rounded-lg bg-[#81a0a6] text-white hover:bg-[#4d5f63] transition-colors duration-300 w-1/3"
        onClick={() => navigate("/admin/products")}
      >
        Manage Products
        <img
          className="h-8 w-8 rounded inline-block ml-7"
          src="./products.png"
          alt=""
        />
      </button>
      <button
        className="m-2 p-5 text-xl font-bold rounded-lg bg-[#81a0a6] text-white hover:bg-[#4d5f63] transition-colors duration-300 w-1/3"
        onClick={() => navigate("/admin/orders")}
      >
        Manage Orders
        <img
          className="h-8 w-8 rounded inline-block ml-9"
          src="./order.png"
          alt=""
        />
      </button>
    </div>
  );
};

export default AdminPage;
