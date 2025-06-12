import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";
// Shadcn charts can be added here if needed using 'recharts'
// import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const data = [
//   { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
//   // ... more data
// ]


export default function VendorAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">Analytics & Reports</h1>
        <p className="text-md text-muted-foreground mt-1">Track your sales, customer preferences, and performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <p className="text-xs text-muted-foreground">+80 orders this week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">+10 new this month</p>
          </CardContent>
        </Card>
         <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28.50</div>
            <p className="text-xs text-muted-foreground">-2.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Sales Over Time</CardTitle>
            <CardDescription>Monthly sales performance for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center bg-muted/30 rounded-md">
            {/* Placeholder for Recharts Line Chart */}
            <LineChart className="h-24 w-24 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Sales chart would be displayed here.</p>
            {/* <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Top Selling Items</CardTitle>
            <CardDescription>Your most popular menu items.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
             <BarChart className="h-24 w-24 text-muted-foreground" />
             <p className="ml-4 text-muted-foreground">Top items chart.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Customer Demographics</CardTitle>
            <CardDescription>Overview of your customer base.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
            <PieChart className="h-24 w-24 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Demographics chart.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
