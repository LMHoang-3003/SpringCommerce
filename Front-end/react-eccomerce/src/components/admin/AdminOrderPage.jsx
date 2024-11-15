import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []); // Gọi fetchOrders một lần khi component mount

  useEffect(() => {
    applyFilters(); // Áp dụng bộ lọc mỗi khi thay đổi trạng thái hoặc khoảng thời gian
  }, [statusFilter, fromDate, toDate, currentPage]);

  const fetchOrders = async () => {
    try {
      const response = await ApiService.getAllOrders();
      const orderList = response.orderItemList || [];
      setOrders(orderList);
      applyFilters(orderList);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch orders"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const applyFilters = (orderList = orders) => {
    let filtered = orderList;

    // Lọc theo trạng thái
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Lọc đơn hàng theo thời gian
    filtered = filtered.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      to.setDate(to.getDate() + 1);

      const isAfterFromDate = !fromDate || orderDate >= from;
      const isBeforeToDate = !toDate || orderDate <= to;

      return isAfterFromDate && isBeforeToDate;
    });

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setFilteredOrders(
      filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setStatusFilter(filterValue);
    setCurrentPage(1);
  };

  const handleDateChange = () => {
    setCurrentPage(1);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className="relative">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative">
          <h2 className="font-bold text-center text-3xl">Orders</h2>

          <div className="filter-container mb-4 p-4 border rounded-lg shadow-md bg-white flex justify-between">
            <div className="statusFilter flex items-center">
              <label className="mr-2 text-lg font-medium">
                Filter By Status:
              </label>
              <select
                value={statusFilter}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#81a0a6] transition duration-150 ease-in-out"
              >
                <option value="">All</option>
                {OrderStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="dateFilter flex items-center">
              <label className="mr-2 text-lg font-medium flex justify-between">
                From:
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  handleDateChange(); // Gọi hàm xử lý thay đổi ngày
                }}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#81a0a6] transition duration-150 ease-in-out"
              />
              <label className="ml-4 mr-2 text-lg font-medium flex justify-between">
                To:
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  handleDateChange(); // Gọi hàm xử lý thay đổi ngày
                }}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#81a0a6] transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
              <thead className="text-xs text-white uppercase bg-[#81a0a6] dark:bg-[#81a0a6] dark:text-white">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Date Ordered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-white dark:even:bg-gray-200 border-b"
                  >
                    <td>{order.id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.status}</td>
                    <td>${order.price.toFixed(2)}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        type="button"
                        className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm"
                        onClick={() => handleOrderDetails(order.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 fill-current mr-3 inline-block"
                          viewBox="0 0 128 128"
                        >
                          <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                        </svg>
                        View Details
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

export default AdminOrdersPage;
