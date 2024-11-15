import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (product?.color) {
      document.documentElement.style.setProperty(
        "--product-color",
        product.color
      );
    }
  }, [product?.color]);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductsById(productId);
      setProduct(response.product);
      console.log(response.product);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const incrementItem = () => {
    if (product) {
      dispatch({ type: "INCREMENT_ITEM", payload: product });
    }
  };

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: "DECREMENT_ITEM", payload: product });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product });
      }
    }
  };

  if (!product) {
    return <p>Loading product details ...</p>;
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="bg-gray-100 dark:bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Hình ảnh sản phẩm */}
          <div className="md:flex-1 px-4">
            <div className="min-h-[460px] min-w-[460px] h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="border-none rounded w-full h-full object-cover"
                src={product?.imageUrl}
                alt={product?.name || "Image not available"}
              />
            </div>
          </div>
          {/* Thông tin chi tiết sản phẩm */}
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-2">
              {product?.name}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-black">
                  Price:
                </span>
                <span className="text-red-500 ml-2 font-bold">
                  ${product?.price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-black">
                  Brand:
                </span>
                <span className="text-black ml-2">{product?.brand}</span>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-black">
                Color:
              </span>
              <span className="text-black ml-2">{product?.color}</span>
              <div className="flex items-center mt-2">
                <button
                  className="w-6 h-6 rounded-full mr-2"
                  style={{ backgroundColor: "var(--product-color)" }}
                ></button>
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-700 dark:text-black">
                Product Description:
              </p>
              <pre className="text-gray-600 dark:text-black text-sm mt-2 font-sans">
                {product?.description}
              </pre>
            </div>
            {cartItem ? (
              <div className="flex items-center mt-4">
                <button
                  onClick={decrementItem}
                  className="bg-black  text-white px-4 py-2 rounded-l hover:bg-gray-500"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-white dark:bg-gray-500 text-gray-800 dark:text-white">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={incrementItem}
                  className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-500"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={addToCart}
                className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-500"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
