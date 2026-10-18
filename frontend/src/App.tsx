import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InvoiceGeneration from "./pages/admin/InvoiceGeneration";
import CustomerManagement from "./pages/admin/CustomerManagement";
import InventoryManagement from "./pages/admin/InventoryManagement";
import InquiryManagement from "./pages/admin/InquiryManagement";
import Reports from "./pages/admin/Reports";
import CompanyProfile from "./pages/admin/CompanyProfile";
import AuthGuard from "@/components/auth/AuthGuard";
import AdminLayout from "./components/admin/AdminLayout";
import ChatWidget from "@/components/ChatWidget";

const queryClient = new QueryClient();

const PublicChatWidget = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return <ChatWidget />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/admin" element={<AdminLogin />} />
          {/* Protected admin routes (all nested under /admin/*) */}
          <Route
            path="/admin/*"
            element={
              <AuthGuard>
                <AdminLayout />
              </AuthGuard>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="invoices" element={<InvoiceGeneration />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="inquiries" element={<InquiryManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="company" element={<CompanyProfile />} />
          </Route>
          {/* Other public routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PublicChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
