import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditProductPage = () => {
  const { productId } = useParams();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));

    if (productId) {
      ApiService.getProductsById(productId).then((response) => {
        setName(response.product.name);
        setDescription(response.product.description);
        setPrice(response.product.price);
        setColor(response.product.color);
        setBrand(response.product.brand);
        setCategoryId(response.product.categoryId);
        setImageUrl(response.product.imageUrl);
      });
    }
  }, [productId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("productId", productId);
      formData.append("categoryId", categoryId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("color", color);

      const response = await ApiService.updateProduct(productId, formData);
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "unable to update product"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <section class="bg-white dark:bg-white">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-black">
          Edit a new product
        </h2>
        {message && (
          <div className="fixed top-0 left-0 right-0 z-50 my-4 p-4 text-center text-white bg-green-500 rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                htmlFor="name"
                class="block mb-2 text-m font-medium text-gray-900 dark:text-black"
              >
                Image of product:
              </label>
              <input type="file" onChange={handleImageChange} />
              {imageUrl && <img src={imageUrl} alt={name} />}

              <label
                htmlFor="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-300"
                placeholder="Type product name"
                required=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="w-full">
              <label
                htmlFor="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-300"
                placeholder="Product brand"
                required=""
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div class="w-full">
              <label
                htmlFor="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-300"
                placeholder="Price"
                required=""
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Category
              </label>
              <select
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-300"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Color
              </label>
              <input
                type="text"
                name="item-weight"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-300"
                placeholder="Color"
                required=""
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div class="sm:col-span-2">
              <label
                htmlFor="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-500 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-300"
                placeholder="Your description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            class="bg-[#1be96d] hover:bg-[#208d44] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Update product
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProductPage;
