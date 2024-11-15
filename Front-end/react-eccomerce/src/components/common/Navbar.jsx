import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    navigate(`/?search=${keyword}`);
  };

  const handleLogout = () => {
    const confirm = window.confirm("Do you want to log out ?");
    if (confirm) {
      ApiService.logOut();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-[#81a0a6]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/">
          <img
            className="h-10 rounded inline-block"
            src="./icons8-spring-boot.svg"
            alt=""
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SpringCommerce
          </span>
        </NavLink>
        <form
          className="navbar-search flex flex-col sm:flex-row sm:w-auto"
          onSubmit={handleSearchSubmit}
        >
          <input
            className="p-2.5 w-full sm:w-[300px] border-none rounded"
            type="text"
            placeholder="Search products"
            value={keyword}
            onChange={handleSearchChange}
          />
          <button
            className="p-2.5 border-none ml-0.5 bg-white text-[#81a0a6] font-bold rounded cursor-pointer"
            type="submit"
          >
            Search
          </button>
        </form>
        <button
          onClick={handleToggle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`md:block w-full md:w-auto ${
            isOpen ? "block" : "hidden"
          } md:flex`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-[#81a0a6] md:dark:bg-[#81a0a6]">
            <li>
              <NavLink
                to="/"
                activeClassName="active"
                className="font-bold block py-2 px-3 text-white rounded  md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className="font-bold block py-2 px-3 text-white rounded  md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              >
                Categories
              </NavLink>
            </li>
            <li>
              {isAuthenticated && (
                <NavLink
                  to="/profile"
                  className="font-bold block py-2 px-3 text-white rounded  md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                >
                  My Account
                </NavLink>
              )}
            </li>
            <li>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="font-bold block py-2 px-3 text-white rounded  md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                >
                  Admin
                </NavLink>
              )}
            </li>
            <li>
              {!isAuthenticated && (
                <NavLink
                  to="/login"
                  className="font-bold block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                >
                  Login
                </NavLink>
              )}
            </li>
            <li>
              {isAuthenticated && (
                <NavLink
                  onClick={handleLogout}
                  className="font-bold block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                >
                  Logout
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/cart"
                className="font-bold block py-2 px-3 text-white rounded  md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              >
                {/* <img
                  className="h-5 rounded inline-block mr-3"
                  src="./shopping-cart.png"
                  alt=""
                /> */}
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
