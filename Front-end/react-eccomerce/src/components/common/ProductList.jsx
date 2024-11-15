import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
  const { cart, dispatch } = useCart();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

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

  return (
    <div className="flex flex-wrap gap-5 justify-center p-5 mx-20">
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return (
          <div
            className="border-none rounded border-gray-300 shadow-md overflow-hidden text-center transition-shadow duration-300 ease-in-out w-[250px] hover:shadow-lg hover:translate-x-[-5px] flex flex-col justify-between"
            key={index}
          >
            <Link
              to={`/product/${product.id}`}
              className="text-inherit no-underline flex flex-col h-full"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[220px] object-cover w-full"
              />
              <h3 className="text-gray-800 text-lg my-2.5 mx-5 line-clamp-2 h-[48px]">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm my-2.5 mx-5 h-[60px] overflow-hidden">
                {truncateText(product.description, 50)}
              </p>
              <span className="text-gray-800 text-[1.1em] my-2.5 block font-bold">
                ${product.price.toFixed(2)}
              </span>
            </Link>
            <div className="flex justify-center items-center">
              {cartItem ? (
                <div className="flex items-center justify-center my-2">
                  <button
                    className="bg-black border-none rounded text-white cursor-pointer text-[1.2em] py-1 px-2 transition-colors duration-300 hover:bg-gray-500"
                    onClick={() => decrementItem(product)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="mx-2 text-[1.2em] text-[#333]">
                    {cartItem.quantity}
                  </span>
                  <button
                    className="bg-black border-none rounded text-white cursor-pointer text-[1.2em] py-1 px-2 transition-colors duration-300 hover:bg-gray-500"
                    onClick={() => incrementItem(product)}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              ) : (
                <button
                  className="bg-black rounded text-white cursor-pointer text-base my-2.5 py-2.5 px-5 transition-colors duration-300 ease-in-out hover:bg-gray-500"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
