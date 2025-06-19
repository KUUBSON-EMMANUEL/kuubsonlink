
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, MapPin, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Address {
  id: string;
  type: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  { id: "addr1", type: "Home", line1: "123 Main Street", city: "Anytown", state: "CA", zip: "90210", isDefault: true },
  { id: "addr2", type: "Work", line1: "456 Business Ave", line2: "Suite 100", city: "Busytown", state: "NY", zip: "10001", isDefault: false },
];

export default function SavedAddressesPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  
  // Add Address Dialog State
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [newAddressType, setNewAddressType] = useState("");
  const [newAddressLine1, setNewAddressLine1] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newAddressCity, setNewAddressCity] = useState("");
  const [newAddressState, setNewAddressState] = useState("");
  const [newAddressZip, setNewAddressZip] = useState("");
  const [newAddressIsDefault, setNewAddressIsDefault] = useState(false);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);

  // Edit Address Dialog State
  const [isEditAddressDialogOpen, setIsEditAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [editAddressType, setEditAddressType] = useState("");
  const [editAddressLine1, setEditAddressLine1] = useState("");
  const [editAddressLine2, setEditAddressLine2] = useState("");
  const [editAddressCity, setEditAddressCity] = useState("");
  const [editAddressState, setEditAddressState] = useState("");
  const [editAddressZip, setEditAddressZip] = useState("");
  const [editAddressIsDefault, setEditAddressIsDefault] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Delete Address Dialog State
  const [isDeleteAddressDialogOpen, setIsDeleteAddressDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const [isDeletingAddress, setIsDeletingAddress] = useState(false);


  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/auth/login");
    }
  }, [currentUser, authLoading, router]);

  const resetAddForm = () => {
    setNewAddressType("");
    setNewAddressLine1("");
    setNewAddressLine2("");
    setNewAddressCity("");
    setNewAddressState("");
    setNewAddressZip("");
    setNewAddressIsDefault(false);
  };
  
  const resetEditForm = () => {
    setEditAddressType("");
    setEditAddressLine1("");
    setEditAddressLine2("");
    setEditAddressCity("");
    setEditAddressState("");
    setEditAddressZip("");
    setEditAddressIsDefault(false);
    setEditingAddress(null);
  };

  const handleAddAddress = async () => {
    if (!newAddressType || !newAddressLine1 || !newAddressCity || !newAddressState || !newAddressZip) {
      toast({
        title: "Error",
        description: "Please fill in all required address fields.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingAdd(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newAddress: Address = {
      id: `addr${Date.now()}`,
      type: newAddressType,
      line1: newAddressLine1,
      line2: newAddressLine2,
      city: newAddressCity,
      state: newAddressState,
      zip: newAddressZip,
      isDefault: newAddressIsDefault,
    };

    setAddresses(prevAddresses => {
      let updatedAddresses = [...prevAddresses];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
      }
      return [newAddress, ...updatedAddresses];
    });

    toast({
      title: "Address Added",
      description: "Your new address has been saved locally.",
    });
    setIsSubmittingAdd(false);
    setIsAddAddressDialogOpen(false);
    resetAddForm();
  };

  const handleOpenEditDialog = (address: Address) => {
    setEditingAddress(address);
    setEditAddressType(address.type);
    setEditAddressLine1(address.line1);
    setEditAddressLine2(address.line2 || "");
    setEditAddressCity(address.city);
    setEditAddressState(address.state);
    setEditAddressZip(address.zip);
    setEditAddressIsDefault(address.isDefault);
    setIsEditAddressDialogOpen(true);
  };

  const handleEditAddress = async () => {
    if (!editingAddress || !editAddressType || !editAddressLine1 || !editAddressCity || !editAddressState || !editAddressZip) {
      toast({
        title: "Error",
        description: "Please fill in all required address fields.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingEdit(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setAddresses(prevAddresses => {
      let updatedAddresses = prevAddresses.map(addr => {
        if (addr.id === editingAddress.id) {
          return {
            ...addr,
            type: editAddressType,
            line1: editAddressLine1,
            line2: editAddressLine2,
            city: editAddressCity,
            state: editAddressState,
            zip: editAddressZip,
            isDefault: editAddressIsDefault,
          };
        }
        return addr;
      });

      if (editAddressIsDefault) {
        updatedAddresses = updatedAddresses.map(addr =>
          addr.id === editingAddress.id ? addr : { ...addr, isDefault: false }
        );
      }
      return updatedAddresses;
    });

    toast({
      title: "Address Updated",
      description: "The address has been successfully updated locally.",
    });
    setIsSubmittingEdit(false);
    setIsEditAddressDialogOpen(false);
    resetEditForm();
  };
  
  const handleOpenDeleteDialog = (address: Address) => {
    setAddressToDelete(address);
    setIsDeleteAddressDialogOpen(true);
  };

  const handleConfirmDeleteAddress = async () => {
    if (!addressToDelete) return;
    setIsDeletingAddress(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setAddresses(prevAddresses => prevAddresses.filter(addr => addr.id !== addressToDelete.id));
    
    toast({
      title: "Address Deleted",
      description: "The address has been removed locally.",
    });
    setIsDeletingAddress(false);
    setIsDeleteAddressDialogOpen(false);
    setAddressToDelete(null);
  };


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
          <MapPin className="mr-3 h-10 w-10" /> Saved Addresses
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Manage your delivery addresses for faster checkout.
        </p>
      </header>

      <div className="mb-6 text-right">
        <Dialog open={isAddAddressDialogOpen} onOpenChange={(isOpen) => {
          setIsAddAddressDialogOpen(isOpen);
          if (!isOpen) resetAddForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline text-primary">Add New Address</DialogTitle>
              <DialogDescription>
                Enter the details for your new address. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <Label htmlFor="addAddressType">Address Type (e.g., Home, Work)</Label>
                <Input id="addAddressType" value={newAddressType} onChange={(e) => setNewAddressType(e.target.value)} placeholder="Home" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="addAddressLine1">Address Line 1</Label>
                <Input id="addAddressLine1" value={newAddressLine1} onChange={(e) => setNewAddressLine1(e.target.value)} placeholder="123 Main Street" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="addAddressLine2">Address Line 2 (Optional)</Label>
                <Input id="addAddressLine2" value={newAddressLine2} onChange={(e) => setNewAddressLine2(e.target.value)} placeholder="Apt #101" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="addAddressCity">City</Label>
                  <Input id="addAddressCity" value={newAddressCity} onChange={(e) => setNewAddressCity(e.target.value)} placeholder="Anytown" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addAddressState">State</Label>
                  <Input id="addAddressState" value={newAddressState} onChange={(e) => setNewAddressState(e.target.value)} placeholder="CA" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="addAddressZip">Zip Code</Label>
                <Input id="addAddressZip" value={newAddressZip} onChange={(e) => setNewAddressZip(e.target.value)} placeholder="90210" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="addAddressIsDefault"
                  checked={newAddressIsDefault}
                  onCheckedChange={(checked) => setNewAddressIsDefault(checked as boolean)}
                />
                <Label htmlFor="addAddressIsDefault" className="text-sm font-medium">
                  Set as default address
                </Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="outline" disabled={isSubmittingAdd}>Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleAddAddress} disabled={isSubmittingAdd}>
                {isSubmittingAdd && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Address Dialog */}
      <Dialog open={isEditAddressDialogOpen} onOpenChange={(isOpen) => {
          setIsEditAddressDialogOpen(isOpen);
          if (!isOpen) resetEditForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline text-primary">Edit Address</DialogTitle>
              <DialogDescription>
                Update the details for this address. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <Label htmlFor="editAddressType">Address Type</Label>
                <Input id="editAddressType" value={editAddressType} onChange={(e) => setEditAddressType(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="editAddressLine1">Address Line 1</Label>
                <Input id="editAddressLine1" value={editAddressLine1} onChange={(e) => setEditAddressLine1(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="editAddressLine2">Address Line 2 (Optional)</Label>
                <Input id="editAddressLine2" value={editAddressLine2} onChange={(e) => setEditAddressLine2(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="editAddressCity">City</Label>
                  <Input id="editAddressCity" value={editAddressCity} onChange={(e) => setEditAddressCity(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="editAddressState">State</Label>
                  <Input id="editAddressState" value={editAddressState} onChange={(e) => setEditAddressState(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="editAddressZip">Zip Code</Label>
                <Input id="editAddressZip" value={editAddressZip} onChange={(e) => setEditAddressZip(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="editAddressIsDefault"
                  checked={editAddressIsDefault}
                  onCheckedChange={(checked) => setEditAddressIsDefault(checked as boolean)}
                />
                <Label htmlFor="editAddressIsDefault" className="text-sm font-medium">
                  Set as default address
                </Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="outline" disabled={isSubmittingEdit}>Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleEditAddress} disabled={isSubmittingEdit}>
                {isSubmittingEdit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      {/* Delete Address Confirmation Dialog */}
      <AlertDialog open={isDeleteAddressDialogOpen} onOpenChange={setIsDeleteAddressDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the address:
              <br />
              <span className="font-semibold">{addressToDelete?.line1}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAddressToDelete(null)} disabled={isDeletingAddress}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteAddress} disabled={isDeletingAddress} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeletingAddress && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Address
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {addresses.length === 0 ? (
        <Card className="text-center py-10 shadow-md">
          <CardContent>
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl font-headline mb-2">No Addresses Saved</CardTitle>
            <CardDescription className="mb-4">You haven&apos;t saved any addresses yet.</CardDescription>
            <Button onClick={() => setIsAddAddressDialogOpen(true)}>Add Your First Address</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {addresses.map((address) => (
            <Card key={address.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-headline text-primary flex items-center">
                    {address.type} {address.isDefault && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Default</span>}
                  </CardTitle>
                  <div>
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleOpenEditDialog(address)}>
                        <Edit className="mr-1 h-4 w-4"/> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" onClick={() => handleOpenDeleteDialog(address)}>
                        <Trash2 className="mr-1 h-4 w-4"/> Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{address.line1}</p>
                {address.line2 && <p className="text-muted-foreground">{address.line2}</p>}
                <p className="text-muted-foreground">{address.city}, {address.state} {address.zip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
