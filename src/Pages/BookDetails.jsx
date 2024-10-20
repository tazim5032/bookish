import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://gutendex.com/books/${id}`);
      const data = await response.json();
      setBook(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError('Failed to load book details.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!book) {
    return <p className="text-center">Book not found.</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white pt-24">
      <div className="flex flex-col md:flex-row items-start">
        <img
          src={book.formats['image/jpeg']}
          alt={book.title}
          className="w-full md:w-1/3 h-auto mb-4 md:mb-0 shadow-lg rounded-lg"
        />
        <div className="md:ml-6">
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-400 mb-4">
            Author: {book.authors?.map(author => author.name).join(', ')}
          </p>
          <p className="text-lg mb-2">
            <strong>Download Count:</strong> {book.download_count}
          </p>
          <p className="text-lg mb-2">
            <strong>Language:</strong> {book.languages.join(', ')}
          </p>
          <p className="text-lg mb-4">
            <strong>Subjects:</strong> {book.subjects?.join(', ')}
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Available Formats:</h2>
            <ul className="list-disc ml-6">
              {Object.entries(book.formats).map(([format, link]) => (
                <li key={format}>
                  <a
                    href={link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {format}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
