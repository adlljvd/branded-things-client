import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Card from "../components/Card";
import gearLoad from "../assets/loading.svg"


export default function Product({ base_url }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Total pages from the API
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(12); // Products per page
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState(''); // Sort state
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)


  // Fetch categories
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${base_url}/pub/categories`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch products based on the current page
  async function fetchProducts() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${base_url}/pub/products`, {
        params: {
          page: currentPage,
          limit: pageSize, // Set the limit per page based on what the API accepts
          filter: filter,
          sort: sort,
          search: search
        },
      });

      console.log("API response:", data);
      setProducts(data.data); // Set the products from the API
      setTotalPages(data.totalPages); // Set the total number of pages from the API response
      setCurrentPage(data.currentPage); // Set the current page from the API response
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories and products on initial render
  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch products based on the current page
  }, [currentPage, filter, sort, search]);

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) { //kalo currentPage kurang dari totalPages, maka bisa next
      const nextPage = Number(currentPage) + 1;
      setCurrentPage(nextPage);
    }
  };

  // Function to go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) { //kalau current page nya lebih dari 1, makan bisa kembali(previous)
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };

  // Function to go to a specific page
  const handlePageClick = (page) => {
    console.log(`Going to page: ${page}`);

    setCurrentPage(page);
  };

  return (
    <>
      {/* select-option for category */}
      <div className="bg-gray-100 py-5">
        <div className='flex justify-between space-x-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* First select option */}
          <form className="w-1/2">
            <select
              id="categories"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              {categories.map(el => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))}
            </select>
          </form>

          {/* Second select option */}
          <form className="w-1/2">
            <select
              id="sort"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="name">A-Z</option>
              <option value="-name">Z-A</option>
            </select>
          </form>

        </div>
      </div>

      {/* Pagination */}
      <nav className="flex items-center justify-center border-t border-gray-200 px-4 sm:px-0">
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
          >
            <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${currentPage == page
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" // Inactive page styles
                  }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${currentPage === totalPages ? "cursor-not-allowed" : ""
              }`}
          >
            Next
            <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Quick search"
          className="w-1/2 max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products */}
      <div className="bg-white">
        {loading ? (
          <div className="mt-16 flex justify-center items-center">
            <img src={gearLoad} className="w-20" />
          </div>
        ) : (
          <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Trending products
              </h2>
            </div>

            <div className="relative mt-8">
              <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                <ul
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:gap-y-8 lg:space-x-0"
                >
                  {products.map((product) => (
                    <Card key={product.id} product={product} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

        )}
      </div>
    </>
  );
}
