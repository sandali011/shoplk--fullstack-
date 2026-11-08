# 🛍️ ShopLK – Modern E-Commerce Web Application

A full-featured, responsive e-commerce web application built from the ground up using **React 19**, **React Router v8**, and **Tailwind CSS v4**. Powered by the **DummyJSON REST API** for live product data.

---

## 🚀 Key Features

### 🔍 Real-Time Product Exploration
- **Debounced Search:** Utilizes React 19's `useDeferredValue` for smooth, lag-free search filtering across 100+ items.
- **Dynamic Categorization:** Automatically extracts unique categories from products using the JavaScript `Set` data structure.
- **Price Sorting:** Sort products dynamically (Default, Price: Low → High, Price: High → Low).
- **Auto-Focus:** Search input is automatically focused on page load via `useRef`.

### 📦 Interactive Product Details
- **Dynamic Routing:** Route parameter handling with `/products/:id` using React Router's `useParams`.
- **Live Details:** Full specifications including star ratings, real-time stock levels, category tags, descriptions, and high-resolution image galleries.
- **Seamless Navigation:** Smart back-navigation using `useNavigate(-1)`.

### 🛒 Global Shopping Cart System
- **State Management:** Powered by Context API and the `useReducer` architectural pattern (`ADD`, `CHANGE_QTY`, `REMOVE`, `CLEAR`).
- **Persistence:** Custom `useLocalStorage` hook keeps the cart state in sync with browser storage (persists on page reloads).
- **Live Navbar Badge:** Real-time quantity counter displayed across all navigation bars.
- **Cart Management:** Increment/decrement quantities, individual item removals, and full cart clearing.

### 🔐 Authentication & Protected Routes
- **Global Auth Context:** Centralized session management via `AuthContext`.
- **Route Guarding:** `ProtectedRoute` component restricts cart/checkout access to authenticated users only.
- **Smart Redirection:** Preserves destination intent via route location state, redirecting users directly back to their cart upon successful login.
- **React 19 Form Actions:** Login form powered by `useActionState` with client-side validation and pending states.

### 🪟 Modals & React Portals
- **Native Portals:** Rendered outside the React root into `document.body` using `createPortal` to avoid CSS overflow/clipping issues.
- **Order Confirmation & Success Dialogs:** Two-step checkout flow with order summary and completion screen.
- **Instant Feedback:** Interactive confirmation modal appears whenever an item is added to the cart.
- **Accessibility:** Keyboard accessibility with Escape (`ESC`) key dismissal and backdrop click handling.

### ⚡ Performance & Error Resilience
- **Code Splitting & Lazy Loading:** Pages are chunked and loaded on-demand via `React.lazy` and `<Suspense>` with a custom animated spinner fallback.
- **Error Boundaries:** Catches runtime rendering exceptions gracefully using a custom class-based `ErrorBoundary` to prevent white-screen crashes.
- **Custom 404 Page:** Catch-all route (`*`) handling for missing or invalid URLs.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (Hooks, Portals, Suspense, Actions)
- **Routing:** React Router v8
- **Styling:** Tailwind CSS v4, `@tailwindcss/vite`
- **Build Tool:** Vite
- **API:** [DummyJSON](https://dummyjson.com/) (Mock REST API)

---

## 📂 Project Architecture

```text
src/
├── main.jsx                 # Application entry point with Providers
├── App.jsx                  # Root layout, routing, lazy loading & error boundary
├── index.css                # Global Tailwind CSS imports
├── hooks/
│   ├── useFetch.js          # API data fetching with AbortController cleanup
│   └── useLocalStorage.js   # Browser localStorage state synchronization
├── context/
│   ├── AuthContext.jsx      # Global authentication state & helper hooks
│   └── CartContext.jsx      # Global cart state machine using useReducer
├── components/
│   ├── Navbar.jsx           # Global sticky navbar with live cart badge
│   ├── ProductCard.jsx      # Product card with instant add-to-cart modal
│   ├── ProtectedRoute.jsx   # Route security gatekeeper
│   ├── Modal.jsx            # Reusable React Portal dialog
│   └── ErrorBoundary.jsx    # Class component fallback for runtime errors
└── pages/
    ├── Home.jsx             # Catalog with search, filters, sorting & grid
    ├── ProductDetails.jsx   # Single product view with route parameters
    ├── Cart.jsx             # Cart management, totals & checkout flow
    ├── Login.jsx            # React 19 useActionState form with validation
    └── NotFound.jsx         # Custom 404 page
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm or yarn

### Installation
1. Clone this repository or download the source code:
   ```bash
   git clone https://github.com/your-username/shop-lk.git
   cd shop-lk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   Produces an optimized production build in the `dist` folder.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).