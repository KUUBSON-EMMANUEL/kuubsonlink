import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function VendorProfilePage() {
  // Fetch vendor data here in a real application
  const vendorData = {
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
              <Input id="restaurantName" defaultValue={vendorData.restaurantName} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cuisineType">Cuisine Type</Label>
              <Input id="cuisineType" defaultValue={vendorData.cuisineType} />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue={vendorData.description} rows={4} />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue={vendorData.address} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="operatingHours">Operating Hours</Label>
            <Textarea id="operatingHours" defaultValue={vendorData.operatingHours} placeholder="e.g., Mon-Fri: 9am - 5pm" rows={3}/>
          </div>

           <div className="flex items-center space-x-2 pt-2">
            <Switch id="acceptingOrders" defaultChecked={vendorData.acceptingOrders} />
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
              <Input id="contactName" defaultValue={vendorData.contactName} />
            </div>
             <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={vendorData.phone} />
            </div>
          </div>
           <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={vendorData.email} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Branding</CardTitle>
           <CardDescription>Upload your restaurant's logo and banner image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div>
                    <Label htmlFor="logo" className="block mb-2">Logo (Recommended: 200x200px)</Label>
                    <img src={vendorData.logoUrl} alt="Current Logo" data-ai-hint="restaurant logo" className="w-32 h-32 object-cover rounded-md border mb-2" />
                    <Input id="logo" type="file" />
                 </div>
                 <div>
                    <Label htmlFor="banner" className="block mb-2">Banner Image (Recommended: 1200x400px)</Label>
                    <img src={vendorData.bannerUrl} alt="Current Banner" data-ai-hint="restaurant banner" className="w-full h-40 object-cover rounded-md border mb-2" />
                    <Input id="banner" type="file" />
                 </div>
            </div>
        </CardContent>
      </Card>

      <div className="mt-10 text-right">
        <Button size="lg" className="font-semibold">Save Changes</Button>
      </div>
    </div>
  );
}
