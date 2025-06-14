
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, MapPin, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Placeholder data - replace with actual data fetching and management
const placeholderAddresses = [
  { id: "addr1", type: "Home", line1: "123 Main Street", city: "Anytown", state: "CA", zip: "90210", isDefault: true },
  { id: "addr2", type: "Work", line1: "456 Business Ave", line2: "Suite 100", city: "Busytown", state: "NY", zip: "10001", isDefault: false },
];

export default function SavedAddressesPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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

  const handleAddNewAddress = () => {
    toast({
      title: "Coming Soon!",
      description: "Adding and managing addresses will be available in a future update.",
    });
  };

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
        <Button onClick={handleAddNewAddress}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      {placeholderAddresses.length === 0 ? (
        <Card className="text-center py-10 shadow-md">
          <CardContent>
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl font-headline mb-2">No Addresses Saved</CardTitle>
            <CardDescription className="mb-4">You haven&apos;t saved any addresses yet.</CardDescription>
            <Button onClick={handleAddNewAddress}>Add Your First Address</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {placeholderAddresses.map((address) => (
            <Card key={address.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-headline text-primary flex items-center">
                    {address.type} {address.isDefault && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Default</span>}
                  </CardTitle>
                  <div>
                    <Button variant="ghost" size="sm" className="mr-2" onClick={handleAddNewAddress}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" onClick={() => toast({title: "Coming Soon", description:"Deleting addresses will be available later."})}>Delete</Button>
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
