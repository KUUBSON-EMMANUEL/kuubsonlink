
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Eye, CheckCircle, Truck, XCircle, PackageSearch, ShoppingCart, CircleOff, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OrderStatus = "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
}

const initialOrders: Order[] = [
  { id: "ORD001", customer: "Alice Wonderland", date: "2024-05-15 10:30 AM", total: 25.99, status: "Pending", items: 3 },
  { id: "ORD002", customer: "Bob The Builder", date: "2024-05-15 11:05 AM", total: 15.50, status: "Preparing", items: 2 },
  { id: "ORD003", customer: "Charlie Chaplin", date: "2024-05-14 08:15 PM", total: 42.00, status: "Out for Delivery", items: 5 },
  { id: "ORD004", customer: "Diana Prince", date: "2024-05-14 07:30 PM", total: 19.75, status: "Delivered", items: 1 },
  { id: "ORD005", customer: "Edward Scissorhands", date: "2024-05-13 01:00 PM", total: 33.20, status: "Cancelled", items: 4 },
];

const getStatusBadgeVariant = (status: OrderStatus): "default" | "destructive" | "secondary" | "outline" => {
  switch (status) {
    case "Pending":
      return "outline"; // Subtle for pending state
    case "Preparing":
      return "secondary"; // Active work in progress
    case "Out for Delivery":
      return "secondary"; // Still active, en route
    case "Delivered":
      return "default"; // Primary color signifies completion
    case "Cancelled":
      return "destructive";
    default:
      return "outline"; // Fallback
  }
};

const statusUpdateActions: { label: string; status: OrderStatus; icon: React.ElementType }[] = [
    { label: "Mark as Pending", status: "Pending", icon: Clock },
    { label: "Mark as Preparing", status: "Preparing", icon: PackageSearch },
    { label: "Mark as Out for Delivery", status: "Out for Delivery", icon: Truck },
    { label: "Mark as Delivered", status: "Delivered", icon: CheckCircle },
    { label: "Mark as Cancelled", status: "Cancelled", icon: CircleOff },
];


export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { toast } = useToast();

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`,
    });
  };

  const handleViewDetails = (orderId: string) => {
    toast({
        title: "Feature Coming Soon",
        description: `Detailed view for order ${orderId} is not yet implemented.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">Order Management</h1>
        <p className="text-md text-muted-foreground mt-1">View and manage incoming customer orders.</p>
      </header>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Current Orders</CardTitle>
          <CardDescription>Monitor real-time order status and take necessary actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-xs">{order.date}</TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(order.id)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {statusUpdateActions.map(action => (
                           <DropdownMenuItem 
                             key={action.status}
                             onClick={() => handleUpdateOrderStatus(order.id, action.status)}
                             disabled={order.status === action.status}
                             className={
                                action.status === "Cancelled" ? "text-red-600 focus:text-red-700 focus:bg-red-50" 
                                : action.status === "Delivered" ? "text-green-600 focus:text-green-700 focus:bg-green-50"
                                : ""
                             }
                           >
                             <action.icon className="mr-2 h-4 w-4" /> {action.label}
                           </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {orders.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3" />
              <p className="font-semibold">No orders to display at the moment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
