# Frontend Project: Edgistify Platform

This project is the frontend for an e-commerce platform, built using React, Chakra UI, and Axios. It enables users to browse products, manage their cart, and place orders seamlessly.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Screens](#screens)
- [License](#license)

## Features
- User authentication (signup and login).
- View products with quantity selection.
- Add products to the cart.
- Display cart details, including a detailed price breakup.
- Place orders with a billing address.
- Responsive design for better user experience across devices.

## Tech Stack
- **React.js** for the frontend framework.
- **Chakra UI** for the UI components and styling.
- **Axios** for API requests.
- **React Router DOM** for client-side routing.

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd frontend-project
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file at the root of the project with the following content:
   ```env
   REACT_APP_API_BASE_URL=<your-backend-api-url>
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
frontend-project/
├── public/
├── src/
│   ├── components/      # Reusable components like Navbar, price breakup, protected Route, cart Item
│   ├── pages/           # Individual pages (Signup, Login, Products, Cart, Checkout)
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point
│   ├── Routing.js       # Routing
├── package.json         # Dependencies and scripts
```

## Available Scripts

### `npm start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.

## API Integration
This project interacts with the backend through the following API endpoints:

### User Authentication
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate an existing user.

### Products
- **GET /api/products**: Fetch a list of all products.

### Cart
- **POST /api/cart**: Add products to the cart.
- **GET /api/cart**: Retrieve the cart details.

### Orders
- **POST /api/orders**: Place an order.

## Screens

### 1. Signup Page
- Input fields for name, email, and password.
- Validation errors displayed below inputs.
- Success/failure popups for user feedback.

### 2. Login Page
- Input fields for email and password.
- Redirects to the products page on successful login.

### 3. Products Page
- Grid display of products with images, names, descriptions, prices, and quantity selectors.
- Add-to-cart functionality with success/failure notifications.

### 4. Cart Page
- List of products in the cart with image, name, description, price, and selected quantity.
- Price breakup box with total items, total quantity, total price, discount, and grand total.

### 5. Checkout Page
- Single input for billing address.
- Submit button to place an order.
