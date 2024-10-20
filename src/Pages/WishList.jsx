import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WishList = () => {
  const [wishlistedBooks, setWishlistedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      await fetchAllBooks(savedWishlist);
    };

    loadWishlist();
  }, []);

  const fetchAllBooks = async (savedWishlist) => {
    try {
      const response = await fetch(`https://gutendex.com/books`); // Fetch all books (without worrying about pagination)
      const data = await response.json();

      // Filter books that match the savedWishlist IDs
      const filteredBooks = data.results.filter((book) =>
        savedWishlist.includes(book.id)
      );

      setWishlistedBooks(filteredBooks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will remove this book from your wishlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = wishlistedBooks.filter(
          (book) => book.id !== bookId
        );
        setWishlistedBooks(updatedWishlist);

        const savedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        const newWishlist = savedWishlist.filter((id) => id !== bookId);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));

        Swal.fire(
          "Removed!",
          "The book has been removed from your wishlist.",
          "success"
        );
      }
    });
  };

  const handleBookDetails = (bookId) => {
    navigate(`/books/${bookId}`); // Navigate to the book details page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-black pt-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Your Wishlist</h1>
        <p className="text-gray-400 text-lg mt-2">
          Here are the books you've added to your wishlist.
        </p>
      </div>

      {wishlistedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-4">
          {wishlistedBooks.map((book) => (
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
              <div className="flex justify-between items-center">
                <button
                  className="mt-3 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300"
                  onClick={() => handleBookDetails(book.id)}
                >
                  More Info
                </button>
                <button
                  className="mt-3 py-2 px-4 text-white rounded-lg transition-colors duration-300"
                  onClick={() => handleRemoveFromWishlist(book.id)}
                >
                  <AiFillHeart className="w-12 h-12 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 text-lg">
            You have no books in your wishlist.
          </p>
        </div>
      )}
    </div>
  );
};

export default WishList;
