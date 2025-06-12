import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Percent, Gift, Edit, Trash2 } from "lucide-react";

// Placeholder promotions data
const promotions = [
  { id: "PROMO001", name: "Weekend Special", type: "Discount", value: "15% off all pizzas", status: "Active" },
  { id: "PROMO002", name: "Lunch Combo Deal", type: "Fixed Price", value: "Burger + Fries + Drink for $10", status: "Active" },
  { id: "PROMO003", name: "Free Delivery Friday", type: "Free Delivery", value: "Free delivery on orders over $20", status: "Inactive" },
];

export default function VendorPromotionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Promotions & Loyalty</h1>
          <p className="text-md text-muted-foreground mt-1">Attract more customers with exciting offers and rewards.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Promotion
        </Button>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-4">Current Promotions</h2>
        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map(promo => (
              <Card key={promo.id} className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-headline flex items-center">
                        {promo.type === "Discount" && <Percent className="h-5 w-5 mr-2 text-primary" />}
                        {promo.type !== "Discount" && <Gift className="h-5 w-5 mr-2 text-primary" />}
                        {promo.name}
                      </CardTitle>
                      <CardDescription className="text-xs">{promo.type}</CardDescription>
                    </div>
                     <Switch defaultChecked={promo.status === "Active"} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{promo.value}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm"><Edit className="mr-1 h-4 w-4"/> Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive"><Trash2 className="mr-1 h-4 w-4"/> Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active promotions yet.</p>
              <Button variant="link" className="mt-2">Create your first promotion</Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-4">Loyalty Program</h2>
         <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-headline">Customer Loyalty Settings</CardTitle>
                <CardDescription>Reward your repeat customers and encourage loyalty.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Switch id="loyaltyEnabled" />
                    <Label htmlFor="loyaltyEnabled" className="text-sm font-medium">
                        Enable Loyalty Program
                    </Label>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="pointsPerDollar">Points earned per dollar spent</Label>
                    <Input id="pointsPerDollar" type="number" defaultValue="10" className="max-w-xs"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="rewardThreshold">Points needed for a reward (e.g., $5 off)</Label>
                    <Input id="rewardThreshold" type="number" defaultValue="1000" className="max-w-xs"/>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Loyalty Settings</Button>
            </CardFooter>
         </Card>
      </section>
    </div>
  );
}
