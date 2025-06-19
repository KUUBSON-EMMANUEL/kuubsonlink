
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, BarChart2, Settings, TrendingUp, ShoppingBag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const adminSections = [
  { title: "User Management", description: "View and manage customer accounts.", icon: Users, href: "/admin/users", disabled: false },
  { title: "Vendor Management", description: "Approve, view, and manage vendor accounts.", icon: Briefcase, href: "/admin/vendors", disabled: false },
  { title: "Site Analytics", description: "Overview of platform usage and key metrics.", icon: BarChart2, href: "/admin/analytics", disabled: true },
  { title: "Platform Settings", description: "Configure global site settings.", icon: Settings, href: "/admin/settings", disabled: true },
];

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">Platform overview and management tools.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminSections.map((section) => (
          <Card key={section.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline">{section.title}</CardTitle>
              <section.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              {section.disabled ? (
                 <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
              ) : (
                <Link href={section.href}>
                  <Button variant="outline" className="w-full">Go to {section.title.split(' ')[0]}</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 shadow-md">
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Quick Stats</CardTitle>
            <CardDescription>At-a-glance platform metrics.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg shadow">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
                    <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">1,234</p> {/* Placeholder */}
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg shadow">
                 <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Vendors</h3>
                    <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">56</p> {/* Placeholder */}
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg shadow">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
                    <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">7,890</p> {/* Placeholder */}
            </div>
             <div className="p-4 bg-secondary/50 rounded-lg shadow">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Pending Approvals</h3>
                    <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">3</p> {/* Placeholder */}
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
