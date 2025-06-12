import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart, Package, ShoppingCart, Users, Utensils, Tag, Settings } from "lucide-react";

const dashboardLinks = [
  { href: "/vendor/dashboard/profile", label: "Manage Profile", icon: Settings, description: "Update your restaurant details and contact info." },
  { href: "/vendor/dashboard/menu", label: "Menu Management", icon: Utensils, description: "Add, edit, or remove menu items and categories." },
  { href: "/vendor/dashboard/orders", label: "View Orders", icon: ShoppingCart, description: "Track incoming orders and manage their status." },
  { href: "/vendor/dashboard/promotions", label: "Promotions", icon: Tag, description: "Create and manage discounts and loyalty programs." },
  { href: "/vendor/dashboard/analytics", label: "Analytics", icon: LineChart, description: "View sales reports and customer insights." },
];

export default function VendorDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Vendor Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">Manage your restaurant, track orders, and grow your business.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardLinks.map(link => (
          <Card key={link.href} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline">{link.label}</CardTitle>
              <link.icon className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
              <Link href={link.href}>
                <Button variant="outline" className="w-full">Go to {link.label.split(' ')[0]}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Stats Example */}
      <section className="mt-12">
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+12 since last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 ending soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">5 recently updated</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
