
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, CreditCard, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Placeholder data
const placeholderPaymentMethods = [
  { id: "pm1", type: "Visa", last4: "4242", expiry: "12/2025", isDefault: true },
  { id: "pm2", type: "Mastercard", last4: "5555", expiry: "06/2026", isDefault: false },
];

export default function PaymentMethodsPage() {
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

  const handleAddNewPaymentMethod = () => {
    toast({
      title: "Coming Soon!",
      description: "Adding and managing payment methods will be available in a future update.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <CreditCard className="mr-3 h-10 w-10" /> Payment Methods
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Manage your saved payment options for quick and easy checkout.
        </p>
      </header>

      <div className="mb-6 text-right">
        <Button onClick={handleAddNewPaymentMethod}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Payment Method
        </Button>
      </div>

      {placeholderPaymentMethods.length === 0 ? (
        <Card className="text-center py-10 shadow-md">
          <CardContent>
            <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl font-headline mb-2">No Payment Methods Saved</CardTitle>
            <CardDescription className="mb-4">You haven&apos;t added any payment methods yet.</CardDescription>
            <Button onClick={handleAddNewPaymentMethod}>Add Your First Payment Method</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {placeholderPaymentMethods.map((method) => (
            <Card key={method.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-headline text-primary flex items-center">
                    {method.type} ending in {method.last4}
                    {method.isDefault && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Default</span>}
                  </CardTitle>
                  <div>
                     <Button variant="ghost" size="sm" className="mr-2" onClick={handleAddNewPaymentMethod}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" onClick={() => toast({title: "Coming Soon", description:"Deleting payment methods will be available later."})}>Delete</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Expires: {method.expiry}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
