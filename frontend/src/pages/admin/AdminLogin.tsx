import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { login } from "@/api/fetcher";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(credentials.username, credentials.password);
      if (result && result.accessToken) {
        // Check if user is admin (backend should return role)
        if (result.role && result.role === "ADMIN") {
          localStorage.setItem("token", result.accessToken);
          localStorage.setItem("adminLoggedIn", "true");
          toast({
            title: "Login Successful",
            description: "Welcome to MJ Fabrication Admin Panel",
          });
          navigate("/admin/dashboard");
        } else {
          toast({
            title: "Access Denied",
            description: "You are not authorized as admin.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Login Failed",
          description: result?.error || "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Server error. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div></div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">MJ</span>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-gray-600">MJ Fabrication Management System</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Login to Admin Panel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
