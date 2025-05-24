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

```
├── DB/            # Database connection setup and seed scripts
├── config/        # Environment variables and JWT configuration
├── src/           # Application logic: models, routes, and controllers
├── app.js         # Main Express application entry point
└── package.json   # Project metadata and dependencies
```




🧪 API Testing

Use **Postman** to interact with and test the API endpoints. Below are the key endpoints along with request methods, example payloads, expected responses, and authentication details where applicable.


---

#### 1. Register a New User  
**Endpoint:** `POST /api/v1/auth/signUp`  
**Description:** Create a new user account.  
**Request Body (JSON):**
```json
{
    "userName": "maryam",
    "email": "maryammohamedsobhy357@gmail.com",
    "password": "Test123",
    "cPassword": "Test123"

}
```

Successful Response (201 Created):
```json
{
    "message": "Registration successful. Please check your email to confirm your account.",
    "savedUser": {
        "userName": "maryam",
        "email": "maryammohamedsobhy357@gmail.com",
        "password": "$2a$09$rRMFNFsj3zwX.PoqLCJLHO0T25qGZpCD6kwExEcd6tBa8ES1Ozqy6",
        "role": "User",
        "active": false,
        "confirmEmail": false,
       ...
    }
}


```

[📬 Click here to open the signUp request](https://www.postman.com/graduation-space-584306/commerceapi/request/5ugm73s/commerceapi?action=share&creator=21090382&ctx=documentation)


#### 2. User Login
**Endpoint:** `POST /api/v1/auth/login`
**Description:** Authenticate user and receive a JWT token for authorized requests.
**Request Body (JSON):**
```json
{ 
  "email": "johndoe@example.com",
  "password": "StrongPassword123"
}
```
Successful Response (200 OK):

```json
{
    "message": "Welcome",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Yzc2ZjIwMmJlMjE1NjI4NWYxNCIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTc0ODAwOTg0NiwiZXhwIjoxNzQ4MTgyNjQ2fQ.8WpE8Z1MQWN9ArenhgzFQtfkfkPLr8mXbE_4G8LEqps"
}
```
Note: Save the returned JWT token. Use it as a Bearer token in the Authorization header for protected endpoints.
[📬 Click here to open the login request](https://graduation-space-584306.postman.co/workspace/My-Workspace~d8e95f0f-1d84-4459-8a9c-dd43a2344723/request/21090382-15c1da63-376a-4e91-b0e1-399f5358e75c)


#### 3. Get Products
**Endpoint:** `GET /api/products`
**Description:** Retrieve a list of available products.
Headers:
Authorization: Bearer <your_jwt_token>
Successful Response (200 OK):

```json
[
  {
    "id": "prod123",
    "name": "Product Name",
    "price": 29.99,
    "category": "Category Name",
    "stock": 100
  },
  ...
]
```

#### 4. Get Categories
**Endpoint:** `GET /api/categories`
**Description:** Retrieve all product categories.
**Headers:**
**Authorization:** Bearer <your_jwt_token>
Successful Response (200 OK):

```json
[
  {
    "id": "cat123",
    "name": "Category Name"
  },
  ...
]
```

#### 5. Create an Order
**Endpoint:** `POST /api/orders`
**Description:** Place a new order with product details.
**Headers:**
**Authorization:** Bearer <your_jwt_token>
Request Body (JSON):

```json
{
  "products": [
    { "productId": "prod123", "quantity": 2 },
    { "productId": "prod456", "quantity": 1 }
  ],
  "shippingAddress": "123 Main St, City, Country"
}
```
Successful Response (201 Created):

```json
{
  "orderId": "order789",
  "status": "Processing",
  "totalAmount": 89.97
}
```


📷 Screenshots
Add Postman screenshots or terminal responses here.

📌 Future Improvements
- Add payment integration

- Add Swagger API docs

| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /api/products      | Get all products |
| POST   | /api/products      | Add new product  |
| POST   | /api/auth/register | Register user    |
| POST   | /api/auth/login    | Login user       |
| ...    | ...                | ...              |




### 🔗 Postman Collection

You can test all API endpoints using the following Postman collection:

[📬 Click here to open the Postman collection](https://www.postman.com/your-link-here)

> Make sure to set the `Authorization` header (Bearer token) after logging in.

Deploy on Render / Vercel

👩‍💻 Author
Maryam Mohamed
Backend Developer

