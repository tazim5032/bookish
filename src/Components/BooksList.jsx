import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://gutendex.com/books");
      const data = await response.json();
      setBooks(data.results);
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Function to handle the "More Info" button click
  const handleMoreInfoClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  // Only show the first 6 books
  const firstSixBooks = books.slice(0, 6);

  return (
    <div className="container mx-auto bg-black">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          Browse through a curated selection of timeless classics and hidden gems.
        </p>
      </div>

      {loading ? (
        // Loading spinner
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-12 p-4">
            {firstSixBooks.map((book) => (
              <div
                key={book.id}
                className="bg-gray-800 text-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-400 mb-1">
                  Author: {book.authors[0]?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-400 mb-1">ID: {book.id}</p>
                <p className="text-sm text-gray-400 mb-1">
                  Genre: {book.subjects[0] || "N/A"}
                </p>
                <button
                  className="mt-3 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300"
                  onClick={() => handleMoreInfoClick(book.id)} // Handle "More Info" click
                >
                  See Details
                </button>
              </div>
            ))}
          </div>

          {/* "See All Books" link */}
          <div className="text-center mt-8">
            <Link
              to="/books"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300"
            >
              See All Books
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;
