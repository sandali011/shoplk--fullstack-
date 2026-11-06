import { Link, NavLink } from "react-router";

function Navbar() {
  
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
          </NavLink>

          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;