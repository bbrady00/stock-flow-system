# AP21 Offsite Stock Management System

Full-stack retail inventory and stock visibility platform inspired by enterprise retail workflows and inventory systems.

This project is designed to simulate real-world retail inventory operations including:

- stock movement tracking
- multi-location inventory visibility
- offsite stock reservation
- incoming stock tracking
- user authentication
- role-based permissions
- protected inventory operations

---

# 🚀 Current Features

## Authentication System

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Persistent login token storage

---

## Role-Based Access Control

Supported user roles:

- ADMIN
- MANAGER
- STAFF

Protected backend routes now require valid authentication tokens before inventory actions can be performed.

---

## Product Management

- Create products
- View all products
- Delete products
- SKU-based inventory structure

---

## Stock Movement System

- IN / OUT inventory adjustments
- Inventory movement history
- Dynamic stock updates
- Event-driven inventory structure

---

## Multi-Location Inventory Architecture

- Multiple inventory locations
- Store-specific inventory visibility
- Warehouse and offsite inventory support
- Flexible location system

### Supported Location Types

- STORE
- WAREHOUSE
- OFFSITE

---

## Inventory Visibility Tracking

Each location can track:

- In-store stock
- Offsite reserved inventory
- Incoming stock

Example:

| Product     | In Store | Offsite Reserved | Incoming |
| ----------- | -------- | ---------------- | -------- |
| Nike Hoodie | 3        | 5                | 2        |

---

# 🧠 Project Goal

The goal of this project is to replicate the workflows and architecture commonly found in enterprise retail inventory systems.

Instead of treating stock as a static value, inventory is managed through:

- stock movement events
- inventory visibility by location
- protected inventory operations
- role-based user permissions
- incoming shipment tracking
- inventory auditing concepts

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Axios
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📂 Project Structure

```bash
client/
server/
```
