# Furniture Hub — React + Redux + JSON Server E-commerce Demo

A polished furniture e-commerce learning project using React, Redux Toolkit, Bootstrap, Axios and JSON Server.

## Run

```bash
npm install
npm start
```

- Storefront: http://localhost:5173
- JSON Server API: http://localhost:5000

If `npm start` is unavailable, run two terminals:

```bash
npm run server
npm run dev
```

## Authentication & authorization

- Guests can browse products and use the cart.
- Registration creates a `role: "user"` record in `data/db.json`.
- Customer login validates credentials against `/users`.
- Checkout requires a customer login before an order can be placed.
- Orders are persisted to `/orders` and linked to the customer's email/user ID.
- `/orders`, `/profile`, and `/order-success` are protected customer routes.
- `/admin`, `/admin/dashboard`, and `/admindashboard` are protected admin routes.
- Admin credentials are validated against the database and require `role: "admin"`.
- Admin can load registered users and orders only by clicking the respective dashboard buttons.
- Passwords are never displayed in the admin user table.

## Demo admin

Email: `admin@furniturehub.com`

Password: `admin123`

This JSON Server setup is for learning/demo use. Production applications should use a real backend, password hashing, secure sessions/JWT, server-side role authorization, HTTPS, and a real database.
