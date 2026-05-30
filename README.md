# W03 Project: Project 2 Part 1 - CRUD Operations

This project is a REST API built with Node.js, Express, and MongoDB. It includes CRUD operations, validation, error handling, and API documentation using Swagger.

## Collections

The database includes two collections:

1. `products`
2. `customers`

The `products` collection has 7 required fields: `name`, `description`, `category`, `price`, `stock`, `brand`, and `sku`.

## Installation

```bash
npm install
```

Create a `.env` file using `.env.example` as a guide:

```bash
MONGODB_URI=your_mongodb_connection_string_here
DATABASE_NAME=w03_project
PORT=3000
```

Run the project:

```bash
npm run dev
```

## API Documentation

Local Swagger documentation:

```text
http://localhost:3000/api-docs
```

Render documentation:

```text
https://your-render-url.onrender.com/api-docs
```

## Routes

### Products

- GET `/products`
- GET `/products/:id`
- POST `/products`
- PUT `/products/:id`
- DELETE `/products/:id`

Example product JSON:

```json
{
  "name": "Laptop",
  "description": "Powerful laptop for programming",
  "category": "Electronics",
  "price": 899.99,
  "stock": 15,
  "brand": "Lenovo",
  "sku": "LEN-001"
}
```

### Customers

- GET `/customers`
- GET `/customers/:id`
- POST `/customers`
- PUT `/customers/:id`
- DELETE `/customers/:id`

Example customer JSON:

```json
{
  "firstName": "David",
  "lastName": "Fontes",
  "email": "david@example.com",
  "phone": "3121234567",
  "city": "Colima"
}
```

## Render Deployment

Add the following environment variables in Render:

- `MONGODB_URI`
- `DATABASE_NAME`
- `PORT`

Use this start command:

```bash
npm start
```

## Week 04 Reminder

For Week 04, OAuth authentication/user management still needs to be added.
