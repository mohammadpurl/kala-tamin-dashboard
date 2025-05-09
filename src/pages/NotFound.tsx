
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background rtl">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-6">صفحه مورد نظر یافت نشد</h2>
        <p className="text-muted-foreground mb-8">صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.</p>
        <Button asChild>
          <Link to="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
