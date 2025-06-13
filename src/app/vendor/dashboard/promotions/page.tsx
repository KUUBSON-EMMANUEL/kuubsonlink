
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Percent, Gift, Edit, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder promotions data
const initialPromotions = [
  { id: "PROMO001", name: "Weekend Special", type: "Discount", value: "15% off all pizzas", status: "Active" },
  { id: "PROMO002", name: "Lunch Combo Deal", type: "Fixed Price", value: "Burger + Fries + Drink for $10", status: "Active" },
  { id: "PROMO003", name: "Free Delivery Friday", type: "Free Delivery", value: "Free delivery on orders over $20", status: "Inactive" },
];

type PromotionType = "Discount" | "Fixed Price" | "Free Delivery";

export default function VendorPromotionsPage() {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState(initialPromotions); // In a real app, this would come from a backend
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newPromoName, setNewPromoName] = useState("");
  const [newPromoType, setNewPromoType] = useState<PromotionType>("Discount");
  const [newPromoValue, setNewPromoValue] = useState("");
  const [newPromoActive, setNewPromoActive] = useState(true);

  const handleCreatePromotion = async () => {
    if (!newPromoName || !newPromoValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the promotion.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPromotion = {
      id: `PROMO${String(promotions.length + 1).padStart(3, '0')}`, // Simple ID generation
      name: newPromoName,
      type: newPromoType,
      value: newPromoValue,
      status: newPromoActive ? "Active" : "Inactive",
    };
    console.log("New Promotion Data:", newPromotion);
    // For now, we'll just log and show a toast. In a real app, you'd add it to state/DB.
    // setPromotions(prev => [...prev, newPromotion]); 

    toast({
      title: "Promotion Created!",
      description: `"${newPromoName}" has been successfully created (logged to console).`,
    });

    // Reset form and close dialog
    setNewPromoName("");
    setNewPromoType("Discount");
    setNewPromoValue("");
    setNewPromoActive(true);
    setIsSubmitting(false);
    setIsCreateDialogOpen(false);
  };


  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Promotions & Loyalty</h1>
          <p className="text-md text-muted-foreground mt-1">Attract more customers with exciting offers and rewards.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-primary">Create New Promotion</DialogTitle>
              <DialogDescription>
                Fill in the details for your new promotion. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promoName" className="text-right">
                  Name
                </Label>
                <Input
                  id="promoName"
                  value={newPromoName}
                  onChange={(e) => setNewPromoName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Summer Sale"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promoType" className="text-right">
                  Type
                </Label>
                <Select value={newPromoType} onValueChange={(value) => setNewPromoType(value as PromotionType)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select promotion type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Discount">Percentage Discount</SelectItem>
                    <SelectItem value="Fixed Price">Fixed Price Deal</SelectItem>
                    <SelectItem value="Free Delivery">Free Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promoValue" className="text-right">
                  Value / Details
                </Label>
                <Input
                  id="promoValue"
                  value={newPromoValue}
                  onChange={(e) => setNewPromoValue(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., 15% off, $5 off, Free Drink"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="promoStatus" className="text-right">
                  Status
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                    <Switch
                        id="promoStatus"
                        checked={newPromoActive}
                        onCheckedChange={setNewPromoActive}
                    />
                    <Label htmlFor="promoStatus" className="text-sm font-normal">
                        {newPromoActive ? "Active" : "Inactive"}
                    </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleCreatePromotion} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Promotion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                        {promo.type === "Fixed Price" && <Gift className="h-5 w-5 mr-2 text-primary" />}
                        {promo.type === "Free Delivery" && <Truck className="h-5 w-5 mr-2 text-primary" />}
                        {promo.name}
                      </CardTitle>
                      <CardDescription className="text-xs">{promo.type}</CardDescription>
                    </div>
                     <Switch defaultChecked={promo.status === "Active"} disabled/>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{promo.value}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => toast({ title: "Coming Soon", description: "Editing promotions will be available later."})}><Edit className="mr-1 h-4 w-4"/> Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" onClick={() => toast({ title: "Coming Soon", description: "Deleting promotions will be available later."})}><Trash2 className="mr-1 h-4 w-4"/> Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active promotions yet.</p>
              <Button variant="link" className="mt-2" onClick={() => setIsCreateDialogOpen(true)}>Create your first promotion</Button>
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
                <Button onClick={() => toast({title: "Settings Saved (Placeholder)", description: "Loyalty settings would be saved to backend."})}>Save Loyalty Settings</Button>
            </CardFooter>
         </Card>
      </section>
    </div>
  );
}
