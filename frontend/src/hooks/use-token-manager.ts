import { useEffect, useState } from "react";
import { verifyToken, manualRefreshToken } from "@/api/fetcher";

export const useTokenManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenValidity = async () => {
    setIsLoading(true);
    try {
      const isValid = await verifyToken();
      setIsAuthenticated(isValid);

      if (!isValid) {
        // Try to refresh the token
        const refreshSuccess = await manualRefreshToken();
        setIsAuthenticated(refreshSuccess);

        if (!refreshSuccess) {
          // Redirect to login if refresh fails
          window.location.href = "/admin";
        }
      }
    } catch (error) {
      console.error("Token validation error:", error);
      setIsAuthenticated(false);
      window.location.href = "/admin";
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const success = await manualRefreshToken();
      setIsAuthenticated(success);
      return success;
    } catch (error) {
      console.error("Token refresh error:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/admin";
    }
  };

  useEffect(() => {
    checkTokenValidity();

    // Set up periodic token validation (every 30 minutes)
    const interval = setInterval(checkTokenValidity, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    refreshToken,
    logout,
    checkTokenValidity,
  };
};
