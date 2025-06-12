import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, Home, HelpCircle } from "lucide-react";
import Link from "next/link";

// Placeholder data for a specific order
const order = {
  id: "ORD789123",
  date: "2024-05-16",
  status: "Out for Delivery", // Could be: "Order Placed", "Preparing", "Out for Delivery", "Delivered"
  estimatedDelivery: "2024-05-16, 6:30 PM - 7:00 PM",
  vendorName: "Spice Route Express",
  vendorImageUrl: "https://placehold.co/100x100.png",
  items: [
    { id: "item1", name: "Chicken Pad Thai", quantity: 1, price: 14.50, imageUrl: "https://placehold.co/80x80.png" },
    { id: "item2", name: "Vegetable Spring Rolls", quantity: 2, price: 7.50, imageUrl: "https://placehold.co/80x80.png" },
  ],
  deliveryAddress: "456 Oak Avenue, Flavor Town, FT 67890",
  subtotal: 29.50,
  deliveryFee: 3.00,
  total: 32.50,
};

const statusSteps = [
  { name: "Order Placed", icon: CheckCircle, completed: true },
  { name: "Preparing", icon: Package, completed: true },
  { name: "Out for Delivery", icon: Truck, completed: order.status === "Out for Delivery" || order.status === "Delivered" },
  { name: "Delivered", icon: Home, completed: order.status === "Delivered" },
];

export default function OrderTrackingPage({ params }: { params: { orderId: string } }) {
  // In a real app, fetch order details using params.orderId

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">Order Tracking</h1>
        <p className="text-md text-muted-foreground mt-1">Track your order <span className="font-semibold text-foreground">#{order.id}</span> from <span className="font-semibold text-foreground">{order.vendorName}</span>.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-headline">Order Status: {order.status}</CardTitle>
              <CardDescription>Estimated Delivery: {order.estimatedDelivery}</CardDescription>
            </div>
            <img src={order.vendorImageUrl} alt={order.vendorName} data-ai-hint="restaurant logo" className="h-16 w-16 rounded-md object-cover" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress Bar */}
          <div className="mb-8">
            <ol className="flex items-center w-full">
              {statusSteps.map((step, index) => (
                <li key={step.name} className={`flex w-full items-center ${index < statusSteps.length -1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${step.completed ? 'text-primary after:border-primary' : 'text-muted-foreground after:border-muted'}`}>
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <step.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </span>
                </li>
              ))}
            </ol>
             <ol className="flex justify-between mt-2 text-xs md:text-sm">
                {statusSteps.map(step => (
                    <li key={`${step.name}-label`} className={`text-center w-1/4 ${step.completed ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>{step.name}</li>
                ))}
            </ol>
          </div>

          {/* Delivery Map Placeholder - This would be an embedded map in a real app */}
          {order.status === "Out for Delivery" && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold font-headline mb-2">Live Tracking</h3>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                <Truck className="h-16 w-16 text-muted-foreground opacity-50" />
                <p className="ml-4 text-muted-foreground">Live map tracking would appear here.</p>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">Order Summary</h3>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0">
                <div className="flex items-center">
                  <img src={item.imageUrl} data-ai-hint="food item" alt={item.name} className="h-12 w-12 rounded-md object-cover mr-4"/>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm text-muted-foreground"><span>Delivery Fee</span><span>${order.deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-bold text-primary mt-1"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Delivery Address */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-2">Delivery Address</h3>
            <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">Order placed on: {new Date(order.date).toLocaleString()}</p>
            <Link href="/support?orderId=${order.id}">
                <Button variant="outline" size="sm">
                    <HelpCircle className="mr-2 h-4 w-4" /> Need Help?
                </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
