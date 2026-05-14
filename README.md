# AP21 Offsite Stock Management System

Full-stack retail inventory and stock visibility platform inspired by enterprise retail workflows and inventory systems.

This project is designed to simulate real-world inventory operations including:

- stock movement tracking
- multi-location inventory visibility
- offsite stock reservation
- incoming shipment tracking
- retail stock management workflows

---

# 🚀 Current Features

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
- Event-driven stock tracking structure

---

## Multi-Location Inventory System

- Create multiple inventory locations
- Warehouse and offsite inventory support
- Flexible location architecture

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

The goal of this project is to replicate the logic and workflows used in enterprise retail inventory systems.

Instead of treating stock as a static number, inventory is managed through:

- stock movement events
- inventory visibility per location
- offsite stock reservation
- incoming inventory tracking
- inventory history and auditing concepts

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

---

# 📂 Project Structure

## Frontend

```bash
client/
server/
```
