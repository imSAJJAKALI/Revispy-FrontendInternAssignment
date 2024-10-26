// App.jsx
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

// Generate 100 categories with unique IDs
const generateCategories = () => {
  return Array.from({ length: 100 }, () => ({
    // id: faker.datatype.uuid(), // Ensure each category has a unique ID
    name: faker.commerce.department(),
  }));
};

const ITEMS_PER_PAGE = 6;

const ProductPage = () => {
  const [categories, setCategories] = useState([]); // Store all categories
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category ID
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  // Load fake categories when the component mounts
  useEffect(() => {
    const fakeCategories = generateCategories();
    setCategories(fakeCategories);
  }, []);

  // Handle category selection (toggle selection)
  const handleToggle = (id) => {
    setSelectedCategory((prev) => (prev === id ? null : id)); // Toggle selection
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginate the categories based on the current page
  const paginatedCategories = categories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  // Generate pagination logic with ellipsis
  const getPagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(CurrentPage, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage,  currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col border items-center p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-2">Please mark your interests!</h1>
      <p className="text-gray-500 mb-4">We will keep you notified.</p>

      <div className="w-80 bg-white border p-4 rounded-lg shadow-md">
        <h2 className="font-medium mb-4">My saved interests!</h2>
        <ul>
          {paginatedCategories.map((category) => (
            <li key={category.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={category.id}
                // checked={selectedCategory === category.id} 
                onChange={() => handleToggle(category.id)}
                className="mr-2"
              />
              <label htmlFor={category.id}>{category.name}</label>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded mr-2 disabled:opacity-50"
          >
            &lt;
          </button>

          {getPagination().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1 border rounded ${
                  currentPage === page ? 'bg-gray-300' : ''
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 py-1">
                {page}
              </span>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded ml-2 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
