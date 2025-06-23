import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/invoices" element={<InvoiceGeneration />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/inventory" element={<InventoryManagement />} />
          <Route path="/admin/inquiries" element={<InquiryManagement />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/profile" element={<CompanyProfile />} />
          <Route path="/admin/company" element={<CompanyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
