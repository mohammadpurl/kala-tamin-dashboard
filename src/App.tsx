
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/orders" element={<Layout><Orders /></Layout>} />
          <Route path="/shipping" element={<Layout><div className="p-8 text-center">صفحه مدیریت ارسال و تحویل به زودی اضافه خواهد شد</div></Layout>} />
          <Route path="/addresses" element={<Layout><div className="p-8 text-center">صفحه مدیریت آدرس‌ها به زودی اضافه خواهد شد</div></Layout>} />
          <Route path="/users" element={<Layout><div className="p-8 text-center">صفحه مدیریت دسترسی کاربران به زودی اضافه خواهد شد</div></Layout>} />
          <Route path="/reports" element={<Layout><div className="p-8 text-center">صفحه گزارش‌گیری پیشرفته به زودی اضافه خواهد شد</div></Layout>} />
          <Route path="/settings" element={<Layout><div className="p-8 text-center">صفحه تنظیمات به زودی اضافه خواهد شد</div></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
