import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Edit3, MapPin, CreditCard, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";

export default function CustomerProfilePage() {
  // Placeholder data
  const user = {
    name: "Kuubson Frankie",
    email: "alex.customer@example.com",
    initials: "KF",
    avatarUrl: "https://placehold.co/100x100.png",
    joinDate: "2023-03-15",
    phone: "(555) 987-6543",
  };

  const accountNav = [
    { name: "Order History", href: "/account/order-history", icon: ShoppingBag },
    { name: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/account/payment-methods", icon: CreditCard },
    { name: "Favorite Vendors", href: "/account/favorites", icon: Heart },
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary">My Account</h1>
        <p className="text-lg text-muted-foreground mt-1">Manage your profile, orders, and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Sidebar / Profile Card */}
        <div className="md:col-span-1 space-y-6">
            <Card className="shadow-md">
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar" />
                    <AvatarFallback className="text-2xl bg-muted">{user.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <CardDescription className="text-xs">Joined: {new Date(user.joinDate).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Avatar
                    </Button>
                </CardContent>
            </Card>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                {accountNav.map(item => (
                    <Link key={item.name} href={item.href}>
                        <Button variant="ghost" className="w-full justify-start">
                            <item.icon className="mr-2 h-4 w-4 text-primary" /> {item.name}
                        </Button>
                    </Link>
                ))}
                </CardContent>
            </Card>
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={user.name} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                   <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={user.phone} />
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold font-headline mb-2">Change Password</h3>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input id="confirmNewPassword" type="password" />
                    </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button size="lg" className="font-semibold">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
