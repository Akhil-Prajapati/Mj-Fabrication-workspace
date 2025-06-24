import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { fetcher } from "@/api/fetcher";
import { useUserStore } from "@/stores/user-store";

const PUBLIC_ROUTES = new Set([
  "/",
  "/about",
  "/contact",
  "/admin", // login page
  // add more public routes as needed
]);
const DEFAULT_PUBLIC_ROUTE = "/admin";

const isProtectedRoute = (pathname: string) => !PUBLIC_ROUTES.has(pathname);

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  useEffect(() => {
    fetcher({ path: "/api/v1/auth/verify", shouldShowLoader: false })
      .then((json) => {
        if (!json || json.error || !json.verified) {
          setStatus(false);
          return;
        }
        setStatus(true);
        if (json.user) {
          setUser(json.user);
        }
      })
      .catch((error) => {
        console.log("log", error);
        setStatus(false);
      });
    // eslint-disable-next-line
  }, [location.pathname]);

  const setStatus = (isValid: boolean) => {
    setIsAuthenticated(isValid);
    setIsLoading(false);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated && isProtectedRoute(location.pathname)) {
    return <Navigate to={DEFAULT_PUBLIC_ROUTE} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
