# CommerceAPI 

A robust and scalable backend API for an e-commerce platform, built with **Node.js**, **Express.js**, and **MongoDB**. This application supports full CRUD operations for products, categories, and orders, along with secure **JWT-based user authentication**. Designed with modular architecture and tested thoroughly using **Postman**, it's an ideal foundation for modern online shopping applications.

## 🔧 Tech Stack

- **Node.js** & **Express.js** – Server-side runtime and framework

- **MongoDB** & **Mongoose** – NoSQL database and ODM

- **JWT Authentication** – Secure token-based auth system

- **RESTful API** – Standardized and scalable endpoints

- **Postman** – API testing and validation

---

## 🚀 Features

- 🛍️ Product Management (CRUD)
- 🗂️ Category & Subcategory System
- 🔐 User Authentication & Authorization (JWT)
- 📦 Order Processing Logic
- 🏷️ Brand Assignment & Filtering
- 📄 Environment-based Config (using `.env`)
- 💬 Clear error handling and status codes

---

## 📁 Project Structure
.
├── DB/              # DB connection and seeders
├── config/          # JWT & environment config
├── src/             # Models, Routes, Controllers
├── app.js           # Express app entry point
└── package.json



🧪 API Testing
Use Postman to test endpoints. You’ll find:

/api/auth/register

/api/auth/login

/api/products

/api/categories

/api/orders

📷 Screenshots
Add Postman screenshots or terminal responses here.

📌 Future Improvements
Add Stripe payment integration

Add Swagger API docs



| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /api/products      | Get all products |
| POST   | /api/products      | Add new product  |
| POST   | /api/auth/register | Register user    |
| POST   | /api/auth/login    | Login user       |
| ...    | ...                | ...              |


Deploy on Render / Vercel

👩‍💻 Author
Maryam Mohamed
Backend Developer

