import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AddressPage = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/edit-address") {
      fetchUserInfo();
    }
  }, [location.pathname]);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      if (response.user.address) {
        setAddress(response.user.address);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch user information"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.saveAddress(address);
      navigate("/profile");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to save/update address"
      );
    }
  };

  return (
    <div className="h-full bg-gray-400 dark:bg-white">
      {/* Container */}
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col - Image Section */}
            <div
              className="w-full h-auto bg-gray-400 dark:bg-gray-600 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')",
              }}
            >
              <img
                src="./pexels-karolina-grabowska-5632380.jpg"
                className="border-none rounded"
                alt="background-image-register"
              />
            </div>
            {/* Col - Form Section */}
            <div className="w-full lg:w-7/12 bg-white dark:bg-[#81a0a6] p-5 rounded-lg lg:rounded-l-none">
              <h2 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                {location.pathname === "/edit-address"
                  ? "Edit Address"
                  : "Add Address"}
              </h2>

              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Address Form */}
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-[#81a0a6] rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="street"
                  >
                    Street:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    required
                    placeholder="Street"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="city"
                  >
                    City:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="state"
                  >
                    State:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="zipCode"
                  >
                    Zip Code:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="Zip Code"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="country"
                  >
                    Country:
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    required
                    placeholder="Country"
                  />
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-black rounded-full hover:bg-gray-500 dark:bg-[#1e90ff] dark:text-white dark:hover:bg-[#225f9c] focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {location.pathname === "/edit-address"
                      ? "Edit Address"
                      : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
