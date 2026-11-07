import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext"; 
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth(); 
  const { totalItems } = useCart();

  const linkClass = ({ isActive }) =>
    isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600";

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          🛍️ ShopLK
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            Cart
            {totalItems > 0 && (
              <span className="ml-1 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-500">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;