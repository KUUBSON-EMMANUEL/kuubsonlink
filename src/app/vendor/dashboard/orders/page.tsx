import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Eye, CheckCircle, Truck, XCircle } from "lucide-react";

// Placeholder order data
const orders = [
  { id: "ORD001", customer: "Alice Wonderland", date: "2024-05-15 10:30 AM", total: 25.99, status: "Pending", items: 3 },
  { id: "ORD002", customer: "Bob The Builder", date: "2024-05-15 11:05 AM", total: 15.50, status: "Preparing", items: 2 },
  { id: "ORD003", customer: "Charlie Chaplin", date: "2024-05-14 08:15 PM", total: 42.00, status: "Out for Delivery", items: 5 },
  { id: "ORD004", customer: "Diana Prince", date: "2024-05-14 07:30 PM", total: 19.75, status: "Delivered", items: 1 },
  { id: "ORD005", customer: "Edward Scissorhands", date: "2024-05-13 01:00 PM", total: 33.20, status: "Cancelled", items: 4 },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "default";
    case "preparing": return "secondary";
    case "out for delivery": return "outline"; // Would ideally be a specific "info" or "warning" variant
    case "delivered": return "default"; // Would ideally be a specific "success" variant (use primary for now)
    case "cancelled": return "destructive";
    default: return "default";
  }
};
const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "bg-yellow-500 hover:bg-yellow-600 text-white"; // Custom class for pending
    case "preparing": return "bg-blue-500 hover:bg-blue-600 text-white"; // Custom class for preparing
    case "out for delivery": return "bg-orange-500 hover:bg-orange-600 text-white";
    case "delivered": return "bg-green-500 hover:bg-green-600 text-white";
    default: return "";
  }
};


export default function VendorOrdersPage() {
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
                    <Badge variant={getStatusBadgeVariant(order.status)} className={getStatusBadgeClass(order.status)}>
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
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-600 focus:text-green-700 focus:bg-green-50">
                          <CheckCircle className="mr-2 h-4 w-4" /> Mark as Preparing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-blue-600 focus:text-blue-700 focus:bg-blue-50">
                          <Truck className="mr-2 h-4 w-4" /> Mark as Out for Delivery
                        </DropdownMenuItem>
                         <DropdownMenuItem className="text-green-600 focus:text-green-700 focus:bg-green-50">
                          <CheckCircle className="mr-2 h-4 w-4" /> Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50">
                           <XCircle className="mr-2 h-4 w-4" /> Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
