import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white rounded-lg shadow-lg"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, loop: Infinity }}
          className="text-6xl mb-4"
        >
          🚨
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <motion.a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiHome className="mr-2" />
          Return to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
