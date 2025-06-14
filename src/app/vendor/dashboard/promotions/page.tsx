
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Percent, Gift, Edit, Trash2, Loader2, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder promotions data
const initialPromotions: Promotion[] = [
  { id: "PROMO001", name: "Weekend Special", type: "Discount", value: "15% off all pizzas", status: "Active" },
  { id: "PROMO002", name: "Lunch Combo Deal", type: "Fixed Price", value: "Burger + Fries + Drink for $10", status: "Active" },
  { id: "PROMO003", name: "Free Delivery Friday", type: "Free Delivery", value: "Free delivery on orders over $20", status: "Inactive" },
];

type PromotionType = "Discount" | "Fixed Price" | "Free Delivery";

interface Promotion {
  id: string;
  name: string;
  type: PromotionType;
  value: string;
  status: "Active" | "Inactive";
}


export default function VendorPromotionsPage() {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newPromoName, setNewPromoName] = useState("");
  const [newPromoType, setNewPromoType] = useState<PromotionType>("Discount");
  const [newPromoValue, setNewPromoValue] = useState("");
  const [newPromoActive, setNewPromoActive] = useState(true);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState<Promotion | null>(null);


  useEffect(() => {
    if (editingPromotion) {
      setNewPromoName(editingPromotion.name);
      setNewPromoType(editingPromotion.type);
      setNewPromoValue(editingPromotion.value);
      setNewPromoActive(editingPromotion.status === "Active");
    } else {
      // Reset form for "create" mode
      setNewPromoName("");
      setNewPromoType("Discount");
      setNewPromoValue("");
      setNewPromoActive(true);
    }
  }, [editingPromotion, isPromotionDialogOpen]);

  const handleOpenCreateDialog = () => {
    setEditingPromotion(null);
    setIsPromotionDialogOpen(true);
  };

  const handleOpenEditDialog = (promo: Promotion) => {
    setEditingPromotion(promo);
    setIsPromotionDialogOpen(true);
  };

  const handleSavePromotion = async () => {
    if (!newPromoName || !newPromoValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the promotion.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (editingPromotion) {
      setPromotions(prev => 
        prev.map(p => 
          p.id === editingPromotion.id 
            ? { ...p, name: newPromoName, type: newPromoType, value: newPromoValue, status: newPromoActive ? "Active" : "Inactive" } 
            : p
        )
      );
      toast({
        title: "Promotion Updated!",
        description: `"${newPromoName}" has been successfully updated.`,
      });
    } else {
      const newPromotion: Promotion = {
        id: `PROMO${String(Date.now()).slice(-6)}`,
        name: newPromoName,
        type: newPromoType,
        value: newPromoValue,
        status: newPromoActive ? "Active" : "Inactive",
      };
      setPromotions(prev => [newPromotion, ...prev]);
      toast({
        title: "Promotion Created!",
        description: `"${newPromoName}" has been successfully created.`,
      });
    }

    setIsSubmitting(false);
    setIsPromotionDialogOpen(false);
    setEditingPromotion(null);
  };

  const handleDeletePromotionClick = (promo: Promotion) => {
    setPromotionToDelete(promo);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!promotionToDelete) return;
    setIsSubmitting(true); // Use same submitting state for loading indicator
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    setPromotions(prev => prev.filter(p => p.id !== promotionToDelete.id));
    toast({
      title: "Promotion Deleted",
      description: `"${promotionToDelete.name}" has been removed.`,
    });
    setIsSubmitting(false);
    setIsDeleteDialogOpen(false);
    setPromotionToDelete(null);
  };


  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Promotions & Loyalty</h1>
          <p className="text-md text-muted-foreground mt-1">Attract more customers with exciting offers and rewards.</p>
        </div>
        <Button onClick={handleOpenCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Promotion
        </Button>
      </header>

      <Dialog open={isPromotionDialogOpen} onOpenChange={(isOpen) => {
        setIsPromotionDialogOpen(isOpen);
        if (!isOpen) setEditingPromotion(null); 
      }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">{editingPromotion ? "Edit Promotion" : "Create New Promotion"}</DialogTitle>
            <DialogDescription>
              {editingPromotion ? "Update the details for this promotion." : "Fill in the details for your new promotion."} Click save when you&apos;re done.
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
            <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => setIsPromotionDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSavePromotion} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingPromotion ? "Save Changes" : "Save Promotion"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the promotion
              &quot;{promotionToDelete?.name}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPromotionToDelete(null)} disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isSubmitting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                     <Switch checked={promo.status === "Active"} onCheckedChange={(checked) => {
                        setPromotions(prev => prev.map(p => p.id === promo.id ? {...p, status: checked ? "Active" : "Inactive"} : p));
                        toast({title: `"${promo.name}" ${checked ? "activated" : "deactivated"}`});
                     }}/>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{promo.value}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenEditDialog(promo)}><Edit className="mr-1 h-4 w-4"/> Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" onClick={() => handleDeletePromotionClick(promo)}><Trash2 className="mr-1 h-4 w-4"/> Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active promotions yet.</p>
              <Button variant="link" className="mt-2" onClick={handleOpenCreateDialog}>Create your first promotion</Button>
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

