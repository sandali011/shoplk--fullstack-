import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;