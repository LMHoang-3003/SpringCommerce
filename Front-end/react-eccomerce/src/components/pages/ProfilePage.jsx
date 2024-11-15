import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch user info"
      );
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  const orderItemList = userInfo.orderItemList || [];

  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto my-12 p-6 border rounded-lg border-[#c7ffb1] bg-[#f5f5f5] shadow-lg">
      <h2 className="text-center mb-6 text-3xl font-bold text-[#2c3e50]">
        Welcome {userInfo.name}!
      </h2>

      {error ? (
        <p className="text-center text-red-500 text-lg mt-4">{error}</p>
      ) : (
        <div className="bg-gray-100">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src="/rabbit.png"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    />

                    <h1 className="text-xl font-bold">{userInfo.name}</h1>
                    <p className="text-gray-700">{userInfo.email}</p>
                    <p className="text-gray-700">{userInfo.phoneNumber}</p>
                    <p className="text-gray-700">{userInfo.role}</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center"></div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                      Address
                    </span>
                    {userInfo.address ? (
                      <ul>
                        <li className="mb-2">
                          <strong>Street:</strong> {userInfo.address.street}
                        </li>
                        <li className="mb-2">
                          <strong>City: </strong>
                          {userInfo.address.city}
                        </li>
                        <li className="mb-2">
                          <strong>State:</strong> {userInfo.address.state}
                        </li>
                        <li className="mb-2">
                          <strong>Zip Code:</strong> {userInfo.address.zipCode}
                        </li>
                        <li className="mb-2">
                          <strong>Country:</strong> {userInfo.address.country}
                        </li>
                      </ul>
                    ) : (
                      <p>No Address information available</p>
                    )}
                    <button
                      className="bg-[#4731ec] text-white px-4 py-1 rounded hover:bg-[#3a26ac] transition-colors"
                      onClick={handleAddressClick}
                    >
                      {userInfo.address ? "Edit Address" : "Add Address"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-9">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    Order History
                  </h2>

                  <ul>
                    {paginatedOrders.map((order) => (
                      <li
                        key={order.id}
                        className="border border-gray-300 rounded-md p-4 flex items-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200"
                      >
                        <img
                          src={order.product?.imageUrl}
                          alt={order.product.name}
                          className="w-20 h-20 object-cover rounded-md mr-5"
                        />
                        <div className="flex-grow">
                          <p className="mb-2">
                            <strong className="text-black text-lg">
                              Name:{" "}
                            </strong>
                            {order.product.name}
                          </p>
                          <p className="mb-2">
                            <strong className="text-black text-lg">
                              Status:{" "}
                            </strong>
                            {order.status}
                          </p>
                          <p className="mb-2">
                            <strong className="text-black text-lg">
                              Quantity:{" "}
                            </strong>
                            {order.quantity}
                          </p>
                          <p className="mb-2">
                            <strong className="text-black text-lg">
                              Price:{" "}
                            </strong>
                            {order.price.toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
