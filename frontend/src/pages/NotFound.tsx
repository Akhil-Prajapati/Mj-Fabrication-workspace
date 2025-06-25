import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="text-center p-10 bg-white rounded-2xl shadow-2xl border border-blue-200 max-w-md w-full">
        <div className="text-7xl mb-4 animate-bounce">🚨</div>
        <h1 className="text-5xl font-extrabold mb-2 text-blue-700 drop-shadow">
          404
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg gap-2"
        >
          <FiHome className="text-2xl" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
