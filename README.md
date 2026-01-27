Product API (Vendor-Scoped)

A backend API built with NestJS and MongoDB, allowing vendors to manage their own products. Supports JWT authentication, vendor-scoped access, soft delete, and pagination & filtering.

Features

Vendor registration & login (JWT authentication)

Create, read, update, and soft delete products

Vendor-scoped access (each vendor manages only their products)

Pagination and filtering (by price and category)

Password hashing with bcrypt

Validation with class-validator

Proper error handling (401, 404, 400)

Tech Stack

Backend: NestJS (TypeScript)

Database: MongoDB (Mongoose)

Authentication: JWT

Validation: class-validator

Documentation: Swagger (optional)

Folder Structure
src/
├─ auth/
│  ├─ auth.service.ts
│  └─ auth.module.ts
├─ vendor/
│  ├─ dto/
│  │  ├─ create-vendor.dto.ts
│  │  └─ login-vendor.dto.ts
│  ├─ schemas/vendor.schema.ts
│  ├─ vendor.repository.ts
│  ├─ vendor.service.ts
│  └─ vendor.controller.ts
├─ product/
│  ├─ dto/
│  │  ├─ create-product.dto.ts
│  │  ├─ update-product.dto.ts
│  │  └─ product-filter.dto.ts
│  ├─ schemas/product.schema.ts
│  ├─ product.repository.ts
│  ├─ product.service.ts
│  └─ product.controller.ts
├─ common/
│  ├─ decorators/current-vendor.decorator.ts
│  └─ guards/jwt-auth.guard.ts
├─ app.module.ts
└─ main.ts

Installation
git clone <your-repo-url>
cd <your-repo-folder>
npm install


Create a .env file:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=3000


Run the server:

npm run start:dev


Server runs at http://localhost:3000.

API Endpoints
Vendor
Method	Route	Description
POST	/vendor/register	Register new vendor
POST	/vendor/login	Login vendor & get JWT
Products (JWT required)
Method	Route	Description
POST	/products	Create product
GET	/products	Get all products (paginated & filtered)
GET	/products/:id	Get product by ID
PATCH	/products/:id	Update product
DELETE	/products/:id	Soft delete product
Example Requests

Register Vendor

POST /vendor/register
{
  "name": "My Vendor",
  "email": "vendor@example.com",
  "password": "password123"
}


Login Vendor

POST /vendor/login
{
  "email": "vendor@example.com",
  "password": "password123"
}


Create Product

POST /products
Authorization: Bearer <JWT>
{
  "name": "Laptop",
  "description": "Gaming Laptop",
  "price": 1500,
  "category": "electronics"
}


Get Products with Pagination & Filters

GET /products?page=1&limit=5&minPrice=500&category=electronics
Authorization: Bearer <JWT>

Testing

Tested using Postman

Handles:

Unauthorized (401)

Not found (404)

Duplicate email (400)

Pagination defaults: page=1, limit=10

Soft-deleted products (isDeleted: true) are hidden

Notes

All product routes are vendor-scoped

JWT token required for all product endpoints

Soft delete prevents permanent removal

Author

Iordye Calvin