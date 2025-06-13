
"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getVendorBySlug, placeholderMenu, placeholderReviews } from '@/lib/placeholder-data';
import { MenuItemCard } from '@/components/cards/MenuItemCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Phone, Star, MessageSquarePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import type { Vendor } from '@/lib/types'; // Import Vendor type for generateStaticParams

interface VendorPageProps {
  params: { vendorId: string }; // vendorId is the slug
}

// Fetch vendor data at build time for generateStaticParams
async function getVendorsForStaticParams() {
  // In a real app, this would fetch from your data source
  // For now, we use the placeholder data directly.
  // Ensure placeholderVendors is accessible here or refactor data fetching.
  const { placeholderVendors } = await import('@/lib/placeholder-data');
  return placeholderVendors;
}


export default function VendorPage({ params }: VendorPageProps) {
  const vendor = getVendorBySlug(params.vendorId);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewComment, setReviewComment] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  if (!vendor) {
    notFound();
  }

  // In a real app, menu and reviews would be fetched based on vendor.id
  const menuCategories = placeholderMenu;
  const reviews = placeholderReviews; // Assuming reviews are part of vendor or fetched separately

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

  const handleReviewSubmit = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }
    // Placeholder submission
    console.log("Review Submitted:", { vendorId: vendor.id, userId: currentUser.uid, rating: reviewRating, comment: reviewComment });
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback (this is a placeholder and not saved).",
    });
    setReviewComment("");
    setReviewRating("5");
    setIsReviewDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Vendor Header */}
      <section className="mb-12">
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={vendor.imageUrl}
            alt={`${vendor.name} storefront`}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            data-ai-hint="restaurant exterior"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 md:p-8 flex flex-col justify-end">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white mb-2">{vendor.name}</h1>
            <p className="text-lg text-gray-200 mb-1">{vendor.cuisine}</p>
            <div className="flex items-center text-gray-200">
              <Star className="w-5 h-5 mr-1 text-yellow-400 fill-yellow-400" />
              <span>{vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-card p-6 rounded-lg shadow-md">
            <p className="text-muted-foreground mb-4">{vendor.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" /> {vendor.address}
                </div>
                <div className="flex items-center text-foreground">
                    <Clock className="w-4 h-4 mr-2 text-primary" /> {vendor.operatingHours}
                </div>
                <div className="flex items-center text-foreground">
                    <Phone className="w-4 h-4 mr-2 text-primary" /> {vendor.contact}
                </div>
            </div>
        </div>
      </section>

      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-8">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu">
          <section>
            {menuCategories.map((category) => (
              <div key={category.id} className="mb-10">
                <h2 className="text-2xl font-headline font-semibold text-foreground mb-6 pb-2 border-b-2 border-primary">
                  {category.name}
                </h2>
                {category.items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.items.map((item, index) => (
                       <div key={item.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                         <MenuItemCard item={item} />
                       </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No items in this category yet.</p>
                )}
              </div>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="reviews">
          <section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-headline font-semibold text-foreground">
                    Customer Feedback 
                    <span className="ml-2 text-yellow-500">({averageRating.toFixed(1)} <Star className="inline w-5 h-5 mb-1 fill-current" />)</span>
                </h2>
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsReviewDialogOpen(true)}>
                        <MessageSquarePlus className="mr-2 h-4 w-4" /> Write a Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-primary">Write a Review for {vendor.name}</DialogTitle>
                      <DialogDescription>
                        Share your experience with other customers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rating" className="text-right">
                          Rating
                        </Label>
                        <Select value={reviewRating} onValueChange={setReviewRating}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            {[5, 4, 3, 2, 1].map(num => (
                              <SelectItem key={num} value={String(num)}>
                                {num} Star{num > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="comment" className="text-right">
                          Comment
                        </Label>
                        <Textarea
                          id="comment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="col-span-3"
                          placeholder="Tell us about your experience..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="button" onClick={handleReviewSubmit}>Submit Review</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </div>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={review.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <ReviewCard review={review} />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to share your thoughts!</p>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Generate static paths for placeholder vendors
export async function generateStaticParams() {
  // The getVendorsForStaticParams function needs to be callable at build time.
  // It might be better to directly access placeholderVendors if it's simple.
  const vendors = await getVendorsForStaticParams();
  return vendors.map((vendor: Vendor) => ({ // Ensure vendor type here
    vendorId: vendor.slug,
  }));
}

// Ensure getVendorBySlug can be used by generateStaticParams if needed for data fetching,
// or ensure placeholderVendors is directly available.
// For this example, it's assumed getVendorBySlug is sufficient for page rendering
// and placeholderVendors (via getVendorsForStaticParams) for path generation.

