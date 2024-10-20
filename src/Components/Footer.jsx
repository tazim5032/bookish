import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-700 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Bookish</h2>
            <p className="text-gray-400">
              Explore a vast collection of books across different genres. Stay updated with the latest releases and recommendations.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2 hover:text-gray-300">
                <a href="#">Home</a>
              </li>
              <li className="mb-2 hover:text-gray-300">
                <a href="#">Book</a>
              </li>
              <li className="mb-2 hover:text-gray-300">
                <a href="#">About Us</a>
              </li>
              <li className="hover:text-gray-300">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <p className="text-gray-400">Email: info@bookish.com</p>
              <p className="text-gray-400">Phone: +123 456 7890</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; 2024 Bookish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
