import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Import heart icons from react-icons

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on component mount
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://gutendex.com/books");
      const data = await response.json();
      setBooks(data.results); // Set all books data here
      setTotalPages(Math.ceil(data.results.length / 9)); // Calculate total pages based on 9 results per page
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setIsLoading(false);
    }
  };

  // Filter and paginate books
  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) => (genre ? book.subjects.includes(genre) : true));

  // Update total pages based on filtered books
  useEffect(() => {
    setTotalPages(Math.ceil(filteredBooks.length / 9));
    setPage(1); // Reset to the first page on new search or genre change
  }, [searchTerm, genre, books]);

  const paginatedBooks = filteredBooks.slice((page - 1) * 9, page * 9); // Paginate 9 books per page

  // Handle Genre Selection
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  // Pagination Handlers
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Navigate to the book details page
  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  // Toggle wishlist for a book
  const toggleWishlist = (bookId) => {
    let updatedWishlist;
    if (wishlist.includes(bookId)) {
      // Remove book from wishlist
      updatedWishlist = wishlist.filter((id) => id !== bookId);
    } else {
      // Add book to wishlist
      updatedWishlist = [...wishlist, bookId];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to localStorage
  };

  const isBookWishlisted = (bookId) => wishlist.includes(bookId); // Check if a book is wishlisted

  return (
    <div className="container mx-auto p-4 bg-black text-white pt-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Discover Your Next Favorite Book</h1>
        <p className="text-gray-400 text-lg mt-2">
          Browse through a curated selection of timeless classics and hidden gems.
        </p>
      </div>
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4 relative">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={handleSearch} // Update search term on input change
          className="w-full md:w-1/2 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Genre Filter */}
        <select
          value={genre}
          onChange={handleGenreChange}
          className="ml-4 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Genres</option>
          {books
            .reduce((acc, book) => {
              book.subjects.forEach((subject) => {
                if (!acc.includes(subject)) acc.push(subject);
              });
              return acc;
            }, [])
            .map((genreOption, index) => (
              <option key={index} value={genreOption}>
                {genreOption}
              </option>
            ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <>
          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-24">
            {paginatedBooks.map((book) => (
              <motion.div
                key={book.id}
                className="bg-gray-800 text-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleBookClick(book.id)} // Navigate on click
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {book.title.length > 50
                    ? book.title.substring(0, 50) + "..."
                    : book.title}
                </h3>
                <p className="text-sm text-gray-400 mb-1">
                  Author: {book.authors[0]?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-400 mb-1">ID: {book.id}</p>
                <p className="text-sm text-gray-400 mb-1">
                  Genre: {book.subjects[0] || "N/A"}
                </p>

                {/* Wishlist Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the book click event from triggering
                    toggleWishlist(book.id);
                  }}
                  className="absolute top-4 right-4 focus:outline-none"
                >
                  {isBookWishlisted(book.id) ? (
                    <AiFillHeart className="w-12 h-12 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="w-12 h-12 text-gray-400" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handlePreviousPage}
              className={`px-4 py-2 mx-2 rounded-lg bg-blue-600 text-white ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="mx-4">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 mx-2 rounded-lg bg-blue-600 text-white ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
