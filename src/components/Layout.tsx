
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  MapPin, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  MenuIcon,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'داشبورد', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'محصولات', icon: <Package size={20} />, path: '/products' },
    { name: 'سفارشات', icon: <ShoppingCart size={20} />, path: '/orders' },
    { name: 'ارسال و تحویل', icon: <Truck size={20} />, path: '/shipping' },
    { name: 'آدرس‌ها', icon: <MapPin size={20} />, path: '/addresses' },
    { name: 'دسترسی کاربران', icon: <Users size={20} />, path: '/users' },
    { name: 'گزارش‌ها', icon: <FileText size={20} />, path: '/reports' },
    { name: 'تنظیمات', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className={`min-h-screen flex rtl ${isDarkMode ? 'dark' : ''}`}>
      {/* Mobile sidebar backdrop */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 right-0 w-64 bg-sidebar text-sidebar-foreground flex flex-col z-30 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold">داشبورد تامین کننده</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X size={20} />
          </Button>
        </div>

        <div className="flex flex-col flex-grow overflow-y-auto">
          <nav className="mt-6 px-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.path 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut size={20} />
            <span>خروج</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <MenuIcon size={20} />
            </Button>
            <h2 className="text-lg font-medium">سامانه مدیریت تامین کننده کالا</h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">حسین مدیر</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                ح
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
