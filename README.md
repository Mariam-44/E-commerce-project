# Fresh Cart 🛒

Fresh Cart is a React-based e-commerce web application where users can browse products, manage a wishlist and cart, and place orders. Guests can freely explore the catalog, while cart, wishlist, and order features require an account.

**Live demo:** https://e-commerce-project-nhgmwo87y-mariams-projects-7b7fa620.vercel.app

## Features

- **Public browsing for everyone** — Home, Products, Categories, Brands, and individual product pages are accessible without an account.
- **Authentication** — Signup, login, forgot password, verify code, and reset password flows.
- **Guarded actions for guests** — Cart, Wishlist, and Orders are protected; guests attempting to access them are notified with a toast prompting them to log in first.
- **Shopping cart** — Add, update quantity, and remove products; apply discount coupons; view cart totals (subtotal, shipping, tax).
- **Wishlist** — Save favorite products and move them to the cart with one click.
- **Order history** — View past orders once logged in.
- **Responsive design** — Built with Tailwind CSS for a clean experience across devices.
- **Toast notifications** — Real-time feedback for actions like adding to cart, errors, and authentication prompts.

## Tech Stack

| Category | Tools |
|---|---|
| Framework | React 18, React Router DOM v7 |
| Styling | Tailwind CSS, Font Awesome |
| State Management | React Context API |
| Forms & Validation | Formik, Yup |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Auth | JWT (jwt-decode) |
| Sliders | Swiper |
| Build Tool | Vite |

## Project Structure

```
src/
├── components/         # Reusable UI components (Navbar, CartItem, WishlistItem, etc.)
├── context/            # React Context providers (User, Cart, Wishlist, Token)
├── pages/              # Route-level pages (Home, Cart, Wishlist, Checkout, etc.)
└── App.jsx             # Route definitions and provider tree
```

## Routing Overview

Routes are split into three groups:

1. **Guest-only routes** — Signup, Login, and password recovery flows (redirect away if already logged in).
2. **Public routes** — Home, Products, Categories, Brands, and product details, open to everyone.
3. **Protected routes** — Cart, Wishlist, Checkout, and Orders, which require authentication.

## Context Providers

- **TokenProvider** — Manages auth token persistence.
- **UserProvider** — Manages logged-in user state and logout.
- **CartProvider** — Handles cart CRUD operations and coupon application via the Route e-commerce API.
- **WishlistProvider** — Handles wishlist CRUD operations.

## API

This project consumes the [Route E-Commerce API](https://ecommerce.routemisr.com), including endpoints for products, categories, brands, cart, wishlist, and orders.