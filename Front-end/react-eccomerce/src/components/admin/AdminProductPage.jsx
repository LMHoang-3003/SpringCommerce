import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "unable to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEdit = async (id) => {
    navigate(`/admin/edit-product/${id}`);
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this product? ");
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "unable to delete product"
        );
      }
    }
  };

  return (
    <div className="relative">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative">
          <h2 className="font-bold text-center text-3xl">Products</h2>

          <button
            className="absolute top-0 right-0 h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
            onClick={() => {
              navigate("/admin/add-product");
            }}
          >
            Add product
          </button>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5 ">
              <thead className="text-xs text-white uppercase bg-[#81a0a6] dark:bg-[#81a0a6] dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-white dark:even:bg-gray-200 border-b "
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-black">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-black">
                      {product.color}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-black">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-black">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-black">
                      <button
                        className="bg-[#4731ec] text-white px-4 py-1 rounded hover:bg-[#3a26ac] transition-colors"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-5 bg-[#ef1b1b] text-white px-4 py-1 rounded hover:bg-red-800 transition-colors"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              className="mt-4" // optional: add margin-top for spacing
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminProductPage;
