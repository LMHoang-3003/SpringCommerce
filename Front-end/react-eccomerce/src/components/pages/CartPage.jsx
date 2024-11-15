import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import Pagination from "../common/Pagination";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total pages
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  // Paginate cart items
  const paginatedCart = cart.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      setMessage("You need to login first");
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 3000);
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderRequest = {
      totalPrice,
      items: orderItems,
    };

    try {
      const response = await ApiService.createOrder(orderRequest);
      setMessage(response.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);

      if (response.status === 200) {
        dispatch({ type: "CLEAR_CART" });
        setMessage("Your order will arrive soon!");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to place an order"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50">
      <div className="max-w-7xl max-lg:max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Your shopping cart
        </h2>
        {message && (
          <div className="my-4 p-4 text-center text-white bg-green-500 rounded-md">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4 relative mt-8">
          <div className="lg:col-span-2 space-y-4">
            {paginatedCart.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative"
              >
                <div className="flex items-center max-sm:flex-col gap-4 max-sm:gap-6">
                  <div className="w-52 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="mt-4 text-sm text-gray-800 space-y-2">
                      {item.description.length > 100
                        ? `${item.description.slice(0, 100)}...`
                        : item.description}
                    </p>

                    <button
                      type="button"
                      className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm"
                    >
                      <a
                        href={`/product/${item.id}`}
                        className="text-gray-600 block"
                      >
                        View Details
                      </a>
                    </button>

                    <hr className="border-gray-300 my-4" />

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-bold text-gray-800">
                          Quantity:
                        </h4>
                        <button
                          onClick={() => decrementItem(item)}
                          className="flex items-center justify-center w-5 h-5 bg-black outline-none rounded-full hover:bg-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 124 124"
                          >
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                          </svg>
                        </button>
                        <span className="font-bold text-sm leading-[16px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item)}
                          className="flex items-center justify-center w-5 h-5 bg-black outline-none rounded-full hover:bg-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 42 42"
                          >
                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center">
                        <h4 className="text-lg font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 absolute top-3.5 right-3.5"
                          viewBox="0 0 320.591 320.591"
                          onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", payload: item })
                          }
                        >
                          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.56-7.288L7.338 50.147C-4.436 38.303-4.436 19.174 7.338 7.33 19.183-4.443 38.312-4.443 50.156 7.33L287.48 268.478c12.246 11.459 11.609 30.677-1.414 42.817a30.41 30.41 0 0 1-18.166 7.288z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination Component */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-0">
            <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>

            <ul className="text-gray-800 text-sm divide-y mt-4">
              <li className="flex flex-wrap gap-4 py-3">
                Subtotal{" "}
                <span className="ml-auto font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Shipping{" "}
                <span className="ml-auto font-bold">
                  ${(1 / 100) * totalPrice.toFixed(2)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Tax{" "}
                <span className="ml-auto font-bold">
                  ${(5 / 100) * totalPrice.toFixed(2)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 py-3 font-bold">
                Total{" "}
                <span className="ml-auto">
                  $
                  {(
                    totalPrice +
                    (1 / 100) * totalPrice.toFixed(2) +
                    (5 / 100) * totalPrice.toFixed(2)
                  ).toFixed(2)}
                </span>
              </li>
            </ul>

            <button
              type="button"
              className="flex items-center justify-center text-sm px-6 py-3 w-full bg-[#42b742] hover:bg-[#006400] text-white rounded-md"
              onClick={handleCheckout}
            >
              <img
                className="h-5 w-5 rounded inline-block mr-2"
                src="./add-to-cart.png"
                alt="LH Spring Commerce"
              />
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
