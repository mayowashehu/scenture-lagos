# Scenture Lagos

![Banner placeholder](./docs/banner-placeholder.png)

## Overview

Scenture Lagos is a premium fragrance e-commerce web application built with React and Vite. It's the digital storefront for a Lagos-based fragrance brand, combining editorial-style brand storytelling with a full online shopping experience — cart, checkout, and account management — alongside an admin panel for running the store.

## Business Problem

A luxury fragrance brand needs an online presence that does more than list products. It needs to communicate exclusivity and brand identity while still functioning as a reliable store: browsing, filtering, checkout, and order management all need to work, without the site feeling like a generic e-commerce template.

## Solution

Scenture Lagos is built as a brand-first storefront: an elegant landing experience and brand story pages sit alongside a fully functional shop, cart, and checkout flow. On the operations side, an admin dashboard gives the business owner control over products, categories, orders, customers, and inventory without needing to touch code.

## Features

**Customer-facing storefront**
- Landing page with hero section and brand messaging
- About page communicating brand identity and mission
- Shop page with category browsing and sorting
- Product detail pages with rich product presentation
- Cart and checkout flow with shipping and payment steps
- Customer account access with authentication and protected routes

**Admin experience**
- Protected admin dashboard with sales and store overview
- Product management (create, edit, view catalog items)
- Category management
- Order tracking and customer management
- Inventory history and store settings

**Technical highlights**
- Responsive UI with Tailwind CSS and Framer Motion animations
- Client-side state management via React Query and context providers
- Role-based access control for customer vs. admin routes
- Mock-data fallback support, so the frontend can be demoed or developed without a live backend connected

**Note on completeness:** the checkout, order, and admin flows are built against an API contract defined in `src/services`. When `VITE_USE_MOCK_DATA` is enabled, the app runs on local mock data rather than a live backend — this is useful for demos but isn't the production data path.

## Architecture Overview

The application is a client-rendered React SPA with a clear split between the public storefront and the admin panel, each with its own layout and route guards. Data fetching and caching go through React Query, with API calls centralized in `src/services` (products, auth, cart, orders, admin). Auth and cart state are handled via React Context providers in `src/contexts`. When a live backend isn't available or `VITE_USE_MOCK_DATA=true` is set, the same service layer falls back to local mock data so the UI remains fully browsable.

## Tech Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- TanStack (React) Query
- Axios
- React Hook Form + Zod
- Lucide icons
- React Helmet (page metadata)

## Screenshots

![Screenshot placeholder — landing page](./docs/screenshot-home-placeholder.png)
![Screenshot placeholder — shop page](./docs/screenshot-shop-placeholder.png)
![Screenshot placeholder — admin dashboard](./docs/screenshot-admin-placeholder.png)

## Live Demo

https://scenturelagos.com.ng

## Repository

https://github.com/mayowashehu/scenture-lagos

## Installation

```bash
# Clone the repository
git clone https://github.com/mayowashehu/scenture-lagos.git
cd scenture-lagos

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with:
VITE_LOCAL_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK_DATA=true

# Run the app locally
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Lint the codebase
npm run lint
```

## Project Structure

```
src/
├── pages/        # Home, shop, about, cart, checkout, account, admin pages
├── components/    # Reusable UI, shared layout, admin-specific sections
├── contexts/      # Auth, cart, and refresh-related state providers
├── services/      # API services — products, auth, cart, orders, admin
└── lib/           # Utilities, mock data, images, location data
scripts/           # Automation scripts for content/page patching
```

## Future Improvements

- Connect the frontend to a production backend API for live order and inventory data
- Expand admin analytics and reporting
- Add order history and customer account improvements
- Improve SEO and content management for product pages

## License

This project is currently unlicensed. All rights reserved unless a license is added.

## Contribution

This is a client project and not currently open for external contributions. Feel free to open an issue if you spot a bug or have a suggestion.
