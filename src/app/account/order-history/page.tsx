
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Import the Badge component

// Placeholder data for orders - replace with actual data fetching
const placeholderOrders = [
  {
    id: "ORD789123",
    date: "2024-05-16",
    status: "Delivered",
    total: 32.50,
    vendorName: "Spice Route Express",
    items: [
      { name: "Chicken Pad Thai", quantity: 1 },
      { name: "Vegetable Spring Rolls", quantity: 2 },
    ],
  },
  {
    id: "ORD456789",
    date: "2024-05-10",
    status: "Cancelled",
    total: 25.99,
    vendorName: "The Gourmet Kitchen",
    items: [
      { name: "Bruschetta", quantity: 1 },
      { name: "Grilled Salmon", quantity: 1 },
    ],
  },
  {
    id: "ORD123456",
    date: "2024-04-28",
    status: "Preparing", // Added another status for testing badge
    total: 19.75,
    vendorName: "Pizza Heaven",
    items: [{ name: "Margherita Pizza", quantity: 1 }],
  },
];

const getStatusBadgeVariant = (status: string): "default" | "destructive" | "secondary" | "outline" => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "default"; // Will use primary color
    case "cancelled":
      return "destructive";
    case "pending":
    case "preparing":
    case "out for delivery":
      return "secondary"; // Good for in-progress/neutral states
    default:
      return "outline"; // Fallback
  }
};


export default function OrderHistoryPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/auth/login");
    }
  }, [currentUser, authLoading, router]);

  if (authLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <ShoppingBag className="mr-3 h-10 w-10" /> Order History
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Review your past orders with KuubsonLink.
        </p>
      </header>

      {placeholderOrders.length === 0 ? (
        <Card className="text-center py-10 shadow-md">
          <CardContent>
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl font-headline mb-2">No Orders Yet</CardTitle>
            <CardDescription className="mb-4">You haven&apos;t placed any orders yet. Start exploring restaurants!</CardDescription>
            <Link href="/restaurants">
                <Button>Browse Restaurants</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {placeholderOrders.map((order) => (
            <Card key={order.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                        <CardTitle className="text-xl font-headline text-primary">Order #{order.id}</CardTitle>
                        <CardDescription>
                            Placed on: {new Date(order.date).toLocaleDateString()} from {order.vendorName}
                        </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)} className="mt-2 md:mt-0">
                        {order.status}
                    </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 mb-3">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-foreground">
                  Total: ${order.total.toFixed(2)}
                </p>
              </CardContent>
              <div className="border-t px-6 py-4 flex justify-end">
                 <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">View Details / Track</Button>
                 </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
