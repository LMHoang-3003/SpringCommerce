import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrderDetailPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [userInfo, setUserInfo] = useState(null); // Added userInfo state
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
      setUserInfo(response.userInfo); // Assuming the API returns userInfo
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderItemStatus(
        orderItemId,
        selectedStatus[orderItemId]
      );
      setMessage("Order item status was successfully updated");
      setTimeout(() => {
        setMessage("");
        navigate("/admin/orders");
      }, 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to update order item status"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 p-6 border rounded-lg border-[#fefefe] bg-[#f5f5f5] shadow-lg">
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <div key={orderItem.id} className="  p-5 mb-5">
            <h2 className="text-center mb-6 text-3xl font-bold text-[#2c3e50]">
              {orderItem.user
                ? `Welcome ${orderItem.user.name}`
                : "Loading user info..."}{" "}
            </h2>
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
                        <h1 className="text-xl font-bold">
                          {orderItem.user.name}
                        </h1>
                        <p className="text-gray-700">{orderItem.user.email}</p>
                        <p className="text-gray-700">
                          {orderItem.user.phoneNumber}
                        </p>
                        <p className="text-gray-700">{orderItem.user.role}</p>
                        <div className="mt-6 flex flex-wrap gap-4 justify-center"></div>
                      </div>
                      <hr className="my-6 border-t border-gray-300" />
                      <div className="flex flex-col">
                        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                          Delivery Address
                        </span>
                        <ul>
                          <li className="mb-2">
                            <p>
                              <strong>Country:</strong>{" "}
                              {orderItem.user.address?.country}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>State:</strong>{" "}
                              {orderItem.user.address?.state}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>City:</strong>{" "}
                              {orderItem.user.address?.city}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>Street:</strong>{" "}
                              {orderItem.user.address?.street}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>Zip Code:</strong>{" "}
                              {orderItem.user.address?.zipCode}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <hr className="my-6 border-t border-gray-300" />
                      <div className="flex flex-col">
                        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                          Order Information
                        </span>
                        <ul>
                          <li className="mb-2">
                            <p>
                              <strong>Order Item ID:</strong> {orderItem.id}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>Quantity:</strong> {orderItem.quantity}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>Total Price:</strong> ${orderItem.price}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>Order Status:</strong> {orderItem.status}
                            </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              <strong>Date Ordered:</strong>{" "}
                              {new Date(
                                orderItem.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-9">
                    <div className="bg-white shadow rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Order Details</h2>
                      <div className="mb-5">
                        <h2 className="font-semibold">Product Information</h2>
                        <img
                          src={orderItem.product.imageUrl}
                          alt={orderItem.product.name}
                          className="mb-3"
                        />
                        <p>
                          <strong>Name:</strong> {orderItem.product.name}
                        </p>
                        <p>
                          <strong>Brand:</strong> {orderItem.product.brand}
                        </p>
                        <p>
                          <strong>Color:</strong> {orderItem.product.color}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {orderItem.product.description}
                        </p>
                        <p>
                          <strong>Price:</strong> ${orderItem.product.price}
                        </p>
                      </div>
                      <div className="mb-5">
                        <h4 className="font-semibold">Change Status</h4>
                        <select
                          className="border border-gray-300 rounded-md p-2"
                          value={
                            selectedStatus[orderItem.id] || orderItem.status
                          }
                          onChange={(e) =>
                            handleStatusChange(orderItem.id, e.target.value)
                          }
                        >
                          {OrderStatus.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          className="bg-blue-500 text-white ml-2 p-2 font-bold text-sm rounded hover:bg-blue-600"
                          onClick={() => handleSubmitStatusChange(orderItem.id)}
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default AdminOrderDetailPage;
