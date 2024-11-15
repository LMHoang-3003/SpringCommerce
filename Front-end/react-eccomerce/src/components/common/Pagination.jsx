import React from "react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumber = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }
  return (
    <div className="flex justify-center my-4 mb-30">
      {pageNumber.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-5 py-2 mx-1 rounded transition duration-300 ${
            number === currentPage
              ? "bg-black text-white hover:bg-gray-500"
              : "bg-black text-white hover:bg-gray-500"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
