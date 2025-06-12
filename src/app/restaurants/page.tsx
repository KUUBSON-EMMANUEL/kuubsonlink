import { VendorCard } from '@/components/cards/VendorCard';
import { placeholderVendors } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search,SlidersHorizontal } from 'lucide-react';

export default function RestaurantsPage() {
  // In a real app, vendors would be fetched from an API
  const vendors = placeholderVendors;

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary">Find Your Next Meal</h1>
        <p className="text-lg text-muted-foreground mt-2">Browse through our curated list of local restaurants and vendors.</p>
      </header>

      {/* Filters and Search */}
      <div className="mb-8 p-6 bg-card rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search by restaurant or cuisine..." 
              className="pl-10" 
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="delivery_time">Delivery Time</SelectItem>
              <SelectItem value="name_asc">Name (A-Z)</SelectItem>
              <SelectItem value="name_desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4"/> Filters
          </Button>
        </div>
      </div>

      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vendors.map((vendor, index) => (
             <div key={vendor.id} style={{ animationDelay: `${index * 50}ms` }}>
                <VendorCard vendor={vendor} />
             </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No restaurants found. Check back soon!</p>
      )}
    </div>
  );
}
