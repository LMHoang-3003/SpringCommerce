import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const RegisterPage = () => {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.registerUser(formData);
      if (response.status === 200) {
        setMessage("User register successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data.message || error.message || "Failed to register"
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
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>

              {/* Registration Form */}
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-[#81a0a6] rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                  />
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-black rounded-full hover:bg-gray-500 dark:bg-[#1e90ff] dark:text-white dark:hover:bg-[#225f9c] focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                </div>

                {message && (
                  <p className="text-center text-red-500">{message}</p>
                )}

                <hr className="mb-6 border-t" />

                <div className="text-center">
                  <p>
                    Already have an account?{" "}
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-[#ff1e1e] align-baseline hover:text-blue-800"
                      href="/login"
                    >
                      Login!
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
