# Natours Project

This project is a backend application for a tour booking platform called Natours. It is built using Node.js, Express, and MongoDB.

## Technologies Used

*   Node.js
*   Express.js
*   MongoDB (via Mongoose)
*   Pug (Templating Engine)
*   Various middleware for security, logging, and request handling (Helmet, Morgan, Express Rate Limit, Mongo Sanitize, XSS Clean, HPP, CORS, Cookie Parser, Compression)
*   JSON Web Tokens (JWT) for authentication
*   Bcrypt for password encryption
*   Multer for handling file uploads
*   Sharp for image processing
*   Nodemailer for sending emails
*   Stripe for payment processing
*   Validator for data validation
*   Slugify for creating URL slugs
*   Axios for making HTTP requests
*   Parcel for bundling frontend assets

## Features

*   User authentication (signup, login, logout, password reset)
*   Tour management (create, read, update, delete tours)
*   Review management (create, read, update, delete reviews)
*   Booking management (create bookings, handle Stripe payments)
*   User profile management (update profile, update password)
*   API for tours, users, reviews, and bookings
*   Server-side rendered views for tours and user accounts

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ahsandani001/natours.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `config.env` file** in the root directory with the following environment variables:
    ```
    NODE_ENV=development
    PORT=8000
    DB_STRING=<Your MongoDB connection string>
    DB_PASS=<Your MongoDB password>
    JWT_SECRET=<Your JWT secret>
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90
    EMAIL_USERNAME=<Your email username>
    EMAIL_PASSWORD=<Your email password>
    EMAIL_HOST=<Your email host>
    EMAIL_PORT=<Your email port>
    EMAIL_FROM=<Your email from address>
    STRIPE_SECRET_KEY=<Your Stripe secret key>
    STRIPE_WEBHOOK_SECRET=<Your Stripe webhook secret>
    ```
    Replace the placeholder values with your actual credentials and configuration.

## How to Run

*   **Development:**
    ```bash
    npm run start:dev
    ```
*   **Production:**
    ```bash
    npm run start:prod
    ```
*   **Debug:**
    ```bash
    npm run debug
    ```
*   **Build Frontend JavaScript:**
    ```bash
    npm run build:js
    ```
*   **Watch Frontend JavaScript for changes:**
    ```bash
    npm run watch:js
    ```

## API Endpoints

### Tours

*   `GET /api/v1/tours` - Get all tours
*   `GET /api/v1/tours/top-5-cheap` - Get top 5 cheapest tours
*   `GET /api/v1/tours/tour-stats` - Get tour statistics
*   `GET /api/v1/tours/monthly-plan/:year` - Get monthly plan for a specific year (Protected, Restricted to Admin, Lead Guide, Guide)
*   `GET /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit` - Get tours within a certain distance from a center point
*   `GET /api/v1/tours/distances/:latlng/unit/:unit` - Get distances to tours from a center point
*   `GET /api/v1/tours/:id` - Get a specific tour by ID
*   `POST /api/v1/tours` - Create a new tour (Protected, Restricted to Admin, Lead Guide)
*   `PATCH /api/v1/tours/:id` - Update a tour by ID (Protected, Restricted to Admin, Lead Guide)
*   `DELETE /api/v1/tours/:id` - Delete a tour by ID (Protected, Restricted to Admin, Lead Guide)

### Users

*   `POST /api/v1/users/signup` - Sign up a new user
*   `POST /api/v1/users/login` - Log in a user
*   `GET /api/v1/users/logout` - Log out a user
*   `POST /api/v1/users/forgotPassword` - Request password reset
*   `PATCH /api/v1/users/resetPassword/:token` - Reset password
*   `PATCH /api/v1/users/updateMyPassword` - Update password for the current logged-in user (Protected)
*   `GET /api/v1/users/me` - Get the current logged-in user's details (Protected)
*   `PATCH /api/v1/users/updateMe` - Update the current logged-in user's details (Protected)
*   `DELETE /api/v1/users/deleteMe` - Delete the current logged-in user (Protected)
*   `GET /api/v1/users` - Get all users (Protected, Restricted to Admin)
*   `POST /api/v1/users` - Create a new user (Protected, Restricted to Admin)
*   `GET /api/v1/users/:id` - Get a specific user by ID (Protected, Restricted to Admin)
*   `PATCH /api/v1/users/:id` - Update a user by ID (Protected, Restricted to Admin)
*   `DELETE /api/v1/users/:id` - Delete a user by ID (Protected, Restricted to Admin)

### Reviews

*   `GET /api/v1/reviews` - Get all reviews
*   `GET /api/v1/tours/:tourId/reviews` - Get reviews for a specific tour
*   `POST /api/v1/tours/:tourId/reviews` - Create a review for a specific tour (Protected, Restricted to User)
*   `GET /api/v1/reviews/:id` - Get a specific review by ID
*   `PATCH /api/v1/reviews/:id` - Update a review by ID (Protected, Restricted to Admin, User)
*   `DELETE /api/v1/reviews/:id` - Delete a review by ID (Protected, Restricted to Admin, User)

### Bookings

*   `GET /api/v1/bookings/checkout-session/:tourId` - Get checkout session for a tour (Protected)
*   `GET /api/v1/bookings` - Get all bookings (Protected, Restricted to Admin, Lead Guide)
*   `POST /api/v1/bookings` - Create a new booking (Protected, Restricted to Admin, Lead Guide)
*   `GET /api/v1/bookings/:id` - Get a specific booking by ID (Protected, Restricted to Admin, Lead Guide)
*   `PATCH /api/v1/bookings/:id` - Update a booking by ID (Protected, Restricted to Admin, Lead Guide)
*   `DELETE /api/v1/bookings/:id` - Delete a booking by ID (Protected, Restricted to Admin, Lead Guide)

## Project Structure

```
.
├── controllers/
├── dev-data/
├── models/
├── postman/
├── public/
├── routes/
├── utils/
├── views/
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── app.js
├── package-lock.json
├── package.json
├── readme.md
└── server.js
```

## Credits

This project is based on the Node.js, Express, and MongoDB course by Jonas Schmedtmann.
