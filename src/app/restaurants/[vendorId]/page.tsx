import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getVendorBySlug, placeholderMenu, placeholderReviews } from '@/lib/placeholder-data';
import { MenuItemCard } from '@/components/cards/MenuItemCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Phone, Star, MessageSquarePlus } from 'lucide-react';

interface VendorPageProps {
  params: { vendorId: string }; // vendorId is the slug
}

export default function VendorPage({ params }: VendorPageProps) {
  const vendor = getVendorBySlug(params.vendorId);

  if (!vendor) {
    notFound();
  }

  // In a real app, menu and reviews would be fetched based on vendor.id
  const menuCategories = placeholderMenu;
  const reviews = placeholderReviews;

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

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
                <Button variant="outline">
                    <MessageSquarePlus className="mr-2 h-4 w-4" /> Write a Review
                </Button>
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
  const vendors = placeholderVendors;
  return vendors.map((vendor) => ({
    vendorId: vendor.slug,
  }));
}
