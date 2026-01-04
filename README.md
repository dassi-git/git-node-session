🛒 Full-Stack E-Commerce Platform
A robust, full-stack e-commerce application built with the MERN stack. This project features a secure authentication system, product management for admins, and a dynamic shopping basket for users.

🚀 Key Features
User Authentication: Secure Login and Register functionality using JWT and bcrypt.

Product Catalog: Browse all products or view detailed information for a specific item.

Admin Dashboard: Exclusive access for administrators to create, update, and delete products from the store.

Shopping Basket: Authenticated users can manage their personal cart, including adding items, updating quantities, and clearing the basket.

Protected Routes: Advanced middleware to ensure only authorized users or admins can access sensitive operations.

🛠️ Tech Stack
Frontend
React (v19)

Redux Toolkit & RTK Query: For efficient state management and server-side data fetching.

React Router Dom: For seamless navigation.

PrimeReact & PrimeFlex: For a modern and responsive UI.

Backend
Node.js & Express: Fast and minimalist web framework.

MongoDB & Mongoose: NoSQL database for flexible data modeling.

JWT (JSON Web Token): For secure user sessions.

dotenv: For environment variable management.

📂 Project Structure
/server: Express backend with MVC architecture (Models, View-Controllers, Routes).

/client: React frontend organized by features (User, Product, Basket).

⚙️ Getting Started
Prerequisites
Node.js installed

MongoDB instance (Local or Atlas)

Installation
Clone the repository

Setup Server:
cd server
npm install
# Create a .env file with: PORT, MONGODB_URI, ACCESS_TOKEN_SECRET
npm start

Setup Client:
cd client
npm install
npm start