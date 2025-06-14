
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Heart } from "lucide-react"; // Removed ShoppingBag as it's not used
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VendorCard } from "@/components/cards/VendorCard";
import { placeholderVendors } from "@/lib/placeholder-data";

// Simulate a list of favorite vendor IDs - in a real app, this would come from user data
const favoriteVendorIds = ['1', '3']; // IDs from placeholderVendors

export default function FavoriteVendorsPage() {
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

  const favoriteVendorsList = placeholderVendors.filter(vendor => favoriteVendorIds.includes(vendor.id));

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <Heart className="mr-3 h-10 w-10" /> Favorite Vendors
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Quickly access your most loved restaurants and food spots.
        </p>
      </header>

      {favoriteVendorsList.length === 0 ? (
        <Card className="text-center py-10 shadow-md">
          <CardContent>
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl font-headline mb-2">No Favorites Yet</CardTitle>
            <CardDescription className="mb-4">You haven&apos;t marked any vendors as favorites. Explore restaurants to find some!</CardDescription>
            <Link href="/restaurants">
                <Button>Browse Restaurants</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVendorsList.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
}
