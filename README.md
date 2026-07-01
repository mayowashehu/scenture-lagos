# Scenture Lagos

Scenture Lagos is a premium fragrance e-commerce web application built with React and Vite. It presents a luxury brand experience for a modern fragrance house in Lagos, combining storytelling, editorial-style design, and full online shopping functionality.

## What this project is about

This project is more than a typical store. It is a polished digital storefront for a high-end fragrance brand that wants to feel exclusive, elegant, and intentional. The experience is designed to:

- showcase a curated collection of luxury fragrance products
- guide visitors through the brand story and values
- support browsing, filtering, and product discovery
- allow customers to add items to cart and complete checkout
- provide an admin experience for managing products, orders, customers, and inventory

In short, the app blends e-commerce, brand storytelling, and store administration in one experience.

## Core features

### Customer-facing storefront
- elegant landing page with hero section and brand messaging
- about page explaining the brand identity and mission
- shop page with category-based browsing and sorting
- product detail pages with rich product presentation
- cart and checkout flow with shipping and payment steps
- account access for customers, including authentication and protected routes

### Admin experience
- protected admin dashboard with sales and store overview
- product management for creating, editing, and viewing catalog items
- category management for organizing the product catalog
- order tracking and customer management
- inventory history and store settings pages

### Technical highlights
- responsive UI with Tailwind CSS
- smooth motion and animation with Framer Motion
- client-side state management with React Query and context providers
- role-based access control for customer and admin routes
- mock-data fallback support so the experience can still run without a live backend

## Tech stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Query
- Axios
- React Hook Form + Zod
- Lucide icons
- Helmet for page metadata

## Project structure

- src/pages: main application pages such as home, shop, about, cart, checkout, account, and admin pages
- src/components: reusable UI components, shared layout components, and admin-specific sections
- src/contexts: authentication, cart, and refresh-related state providers
- src/services: API services for products, auth, cart, orders, and admin operations
- src/lib: utilities, mock data, site images, location data, and helper functions
- scripts: small automation scripts for content or page patching tasks

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a .env file in the project root with values similar to:

```env
VITE_LOCAL_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK_DATA=true
```

If you are connecting to a backend, update the API URLs accordingly. If mock data is enabled, the app can use local sample content for products and categories.

### 3. Run the app locally

```bash
npm run dev
```

The app should be available in your browser at the local Vite URL.

## Available scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

The codebase is structured as a modern React storefront with a clear separation between public and admin experiences. The UI is heavily customized and brand-driven, so it is designed to feel more like a luxury product website than a generic e-commerce template.

If you want to evolve this project further, the most natural next steps are:
- connect the frontend to a real backend API for full production data
- expand admin analytics and reporting
- add order history and customer account improvements
- improve SEO and content management for product pages
