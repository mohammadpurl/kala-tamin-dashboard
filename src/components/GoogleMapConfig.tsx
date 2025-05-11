
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapConfigProps {
  onApiKeySet: (apiKey: string) => void;
}

const GoogleMapConfig: React.FC<GoogleMapConfigProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();

  // بررسی وجود API Key در localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_maps_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeySet(savedApiKey);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('google_maps_api_key', apiKey);
      onApiKeySet(apiKey);
      toast({
        title: "کلید API ذخیره شد",
        description: "کلید API گوگل مپ با موفقیت ذخیره شد.",
      });
    } else {
      toast({
        title: "خطا",
        description: "لطفا کلید API معتبر وارد کنید.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">تنظیمات نقشه گوگل</CardTitle>
        <CardDescription>برای استفاده از نقشه گوگل، کلید API خود را وارد کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">کلید API گوگل مپ:</label>
            <Input 
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="کلید API Google Maps خود را وارد کنید"
              dir="ltr"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            <p>برای دریافت کلید API گوگل مپ، به <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a> مراجعه کنید.</p>
            <p className="mt-1">کلیدهای API مورد نیاز: Maps JavaScript API و Geocoding API</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveApiKey}>ذخیره کلید API</Button>
      </CardFooter>
    </Card>
  );
};

export default GoogleMapConfig;
