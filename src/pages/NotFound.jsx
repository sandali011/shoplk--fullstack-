import { Link } from "react-router";

function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-6">Can't Find This Page 🤔</p>
      <Link to="/" className="text-indigo-600 hover:underline font-semibold">
        Go to Home Page →
      </Link>
    </div>
  );
}

export default NotFound;