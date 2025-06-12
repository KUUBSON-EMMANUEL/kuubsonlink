import Image from 'next/image';
import Link from 'next/link';
import type { Vendor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MapPin, Utensils } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl group animate-in fade-in slide-in-from-bottom-8 duration-500">
      <CardHeader className="p-0 relative">
        <Link href={`/restaurants/${vendor.slug}`}>
          <Image
            src={vendor.imageUrl}
            alt={vendor.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="food restaurant"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-headline mb-1">
          <Link href={`/restaurants/${vendor.slug}`} className="hover:text-primary transition-colors">
            {vendor.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 flex items-center">
          <Utensils className="w-4 h-4 mr-1.5 text-primary" /> {vendor.cuisine}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" /> 
          <span>{vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" /> 
          <span>{vendor.address.split(',')[0]}</span> {/* Show only first part of address for brevity */}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/restaurants/${vendor.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Menu
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
