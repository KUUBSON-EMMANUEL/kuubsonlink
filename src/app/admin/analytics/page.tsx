
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Users, Briefcase, ShoppingBag, DollarSign, PieChart as LucidePieChart } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Placeholder data for Sales Over Time chart
const salesData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
];

// Placeholder data for User Demographics (example for a pie chart)
const userDemographicsData = [
    { name: '18-24', value: 400 },
    { name: '25-34', value: 600 },
    { name: '35-44', value: 500 },
    { name: '45+', value: 300 },
];


export default function AdminAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <BarChart2 className="mr-3 h-10 w-10" /> Platform Analytics
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Key metrics and performance indicators for VendorLink.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">+50 this week</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Briefcase className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">56</div>
            <p className="text-xs text-muted-foreground">+3 new applications</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">7,890</div>
            <p className="text-xs text-muted-foreground">+120 today</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Sales Over Time</CardTitle>
            <CardDescription>Monthly sales performance for the current year.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))', radius: 4 }}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)"}}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 'bold' }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                />
                <Legend wrapperStyle={{fontSize: "12px", color: "hsl(var(--muted-foreground))", paddingTop: '10px'}} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Total Sales" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline">User Demographics</CardTitle>
            <CardDescription>Breakdown of users by age group (Placeholder).</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center bg-muted/30 rounded-b-lg">
            <LucidePieChart className="h-24 w-24 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">User demographics pie chart coming soon.</p>
            <p className="text-xs text-muted-foreground mt-1">(Placeholder data used for illustration)</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 p-4 bg-secondary/30 rounded-md">
        <h3 className="font-semibold text-lg mb-2 font-headline">Developer Note:</h3>
        <p className="text-xs text-muted-foreground">
          This analytics page uses placeholder data. In a real-world application, this data would be fetched
          from a backend service and updated dynamically. The charts are implemented using Recharts.
        </p>
      </div>
    </div>
  );
}

