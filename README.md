# Bookish

This project is a book listing application built with **React** and **Tailwind CSS**. It fetches data from the **Gutenberg Books API** (`https://gutendex.com/books`) and displays the books in a clean and user-friendly format. The app includes various functionalities like real-time search, filtering by genre, a wishlist feature, and pagination.

## Live Demo
You can view the live version of the app here: [Live Link](https://bookish-guys.netlify.app)

## Features

### 1. Book Listing
- Fetches a list of books from the **Gutenberg Books API** and displays them on the homepage.
- Each book displays:
  - **Title**
  - **Author**
  - **Cover Image**
  - **Genre** (Subjects)
  - **ID**

### 2. Real-Time Search
- Users can search for books by title using a search bar.
- Search results are updated in real-time as the user types.

### 3. Genre Filter
- A dropdown filter allows users to filter books by genre/topic.

### 4. Wishlist Feature
- Users can add or remove books to/from a wishlist.
- Wishlisted books display a "liked" or "heart" icon, which can be toggled to save or remove books from the wishlist.
- Wishlists are stored in **localStorage** so that they persist between sessions.

### 5. Pagination
- The book listing is paginated, allowing users to navigate between pages (e.g., Next, Previous, or numbered pages like 1, 2, 3…).

### 6. User Interface
- The application is fully responsive and works well on both desktop and mobile devices.
- Designed using **React** and **Tailwind CSS** for responsiveness and layout flexibility.

## Pages

### 1. Homepage
- Displays the list of books with real-time search, genre filter, and pagination functionality.

### 2. Wishlist Page
- Displays books that have been added to the wishlist.

### 3. Book Details Page
- Displays detailed information about a specific book when clicked on.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tazim5032/bookish.git
   ```

2. Install dependencies:
   ```bash
   cd bookish
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open the app in the browser:
   ```
   http://localhost:3000
   ```

## Technologies Used
- **React JS** for building the user interface.
- **Tailwind CSS** for responsive design and styling.
- **JavaScript (ES6)** for implementing functionalities.
- **LocalStorage** for saving user preferences and wishlist data.


## API Documentation
For more information on the API used in this project, please visit the [Gutenberg Books API Documentation](https://gutendex.com/).
