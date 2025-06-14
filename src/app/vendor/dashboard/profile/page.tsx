
"use client";

import { useState }_ from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const initialVendorData = {
  restaurantName: "The Gourmet Kitchen",
  contactName: "John Chef",
  email: "john.chef@example.com",
  phone: "(555) 123-4567",
  address: "123 Foodie Lane, Gourmet City, GC 12345",
  cuisineType: "Modern European",
  description: "Serving delicious, locally-sourced meals with a modern twist. Perfect for a hearty lunch or a delightful dinner.",
  operatingHours: "Mon-Fri: 11am - 10pm, Sat: 12pm - 11pm, Sun: Closed",
  acceptingOrders: true,
  logoUrl: "https://placehold.co/200x200.png",
  bannerUrl: "https://placehold.co/800x300.png",
};

export default function VendorProfilePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialVendorData);
  const [isSaving, setIsSaving] = useState(false);
  const [logoFilePreview, setLogoFilePreview] = useState<string | null>(formData.logoUrl);
  const [bannerFilePreview, setBannerFilePreview] = useState<string | null>(formData.bannerUrl);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptingOrders: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoFilePreview(reader.result as string);
          // In a real app, you'd upload the file and store the URL
          // For now, we'll just update the placeholder URL if needed, or manage the file object
          setFormData(prev => ({ ...prev, logoUrl: reader.result as string })); // Or just for preview
        } else {
          setBannerFilePreview(reader.result as string);
          setFormData(prev => ({ ...prev, bannerUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving vendor profile data:", formData);
    toast({
      title: "Profile Updated!",
      description: "Your restaurant profile has been (locally) updated.",
    });
    setIsSaving(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">Restaurant Profile</h1>
        <p className="text-md text-muted-foreground mt-1">Keep your restaurant information up-to-date.</p>
      </header>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Business Details</CardTitle>
          <CardDescription>Manage your restaurant's public information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input id="restaurantName" value={formData.restaurantName} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cuisineType">Cuisine Type</Label>
              <Input id="cuisineType" value={formData.cuisineType} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleInputChange} rows={4} />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={formData.address} onChange={handleInputChange} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="operatingHours">Operating Hours</Label>
            <Textarea id="operatingHours" value={formData.operatingHours} onChange={handleInputChange} placeholder="e.g., Mon-Fri: 9am - 5pm" rows={3}/>
          </div>

           <div className="flex items-center space-x-2 pt-2">
            <Switch id="acceptingOrders" checked={formData.acceptingOrders} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="acceptingOrders" className="text-sm font-medium">
                Currently Accepting Orders
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" value={formData.contactName} onChange={handleInputChange} />
            </div>
             <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>
           <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Branding</CardTitle>
           <CardDescription>Upload your restaurant's logo and banner image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                 <div>
                    <Label htmlFor="logo" className="block mb-2">Logo (Recommended: 200x200px)</Label>
                    {logoFilePreview && <img src={logoFilePreview} alt="Current Logo" data-ai-hint="restaurant logo" className="w-32 h-32 object-cover rounded-md border mb-2" />}
                    <Input id="logoFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                 </div>
                 <div>
                    <Label htmlFor="banner" className="block mb-2">Banner Image (Recommended: 1200x400px)</Label>
                    {bannerFilePreview && <img src={bannerFilePreview} alt="Current Banner" data-ai-hint="restaurant banner" className="w-full h-40 object-cover rounded-md border mb-2" />}
                    <Input id="bannerFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} />
                 </div>
            </div>
        </CardContent>
      </Card>

      <div className="mt-10 text-right">
        <Button size="lg" className="font-semibold" onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

    