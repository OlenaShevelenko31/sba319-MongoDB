# MongoDB Database Application

This is an Express.js application that serves as an API for managing users, books, and reviews.

## Overview

This application is built using Express.js, a minimalist web application framework for Node.js. It provides a RESTful API to perform CRUD operations on users, books, and reviews. It utilizes middleware for request logging and error handling, and serves static files for stylesheets.

## Usage

1. Run `npm start` to start the server.
2. Access the API endpoints using tools like Postman or any HTTP client.
   - Users: `/users`
   - Books: `/books`
   - Reviews: `/reviews`
3. The landing page can be accessed at the root URL (`/`).

## File Structure

- `server.js`: Entry point of the application.
- `routes/`: Directory containing route handlers.
    - `getUser.js`: Route handler for user-related operations.
    - `getBooks.js`: Route handler for book-related operations.
    - `getReviews.js`: Route handler for review-related operations.
- `db/`: Directory containing MongoDB connection and setup.
- `styles/style.css `: Directory containing CSS files .
- `index.html`: HTML file served as the landing page for .

## Middleware

- Custom logger middleware logs requests to the console.
- Error handling middleware responds with a 500 status code for server errors.

## Dependencies

- `express`: Web application framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `path`: Provides utilities for working with file and directory paths.
- `mongodb`: MongoDB Node.js driver for interacting with MongoDB databases.

## View of main page
<img width="1033" alt="Screenshot 2024-05-17 at 9 01 44 PM" src="https://github.com/OlenaShevelenko31/sba319-MongoDB/assets/163446129/0e9b5470-4425-4bef-a85e-1b1ea8f4a919">


##  View of all users
<img width="965" alt="Screenshot 2024-05-17 at 9 08 16 PM" src="https://github.com/OlenaShevelenko31/sba319-MongoDB/assets/163446129/e2e3d2ff-4f3d-4769-8f36-75843468c620">


## View of all reviews
<img width="968" alt="Screenshot 2024-05-17 at 9 08 50 PM" src="https://github.com/OlenaShevelenko31/sba319-MongoDB/assets/163446129/590afef3-6bad-49b0-8444-938196e24289">



