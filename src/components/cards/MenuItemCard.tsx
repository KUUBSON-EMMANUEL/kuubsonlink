import Image from 'next/image';
import type { MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Leaf, WheatOff } from 'lucide-react'; // Example dietary icons

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg group">
      <CardHeader className="p-0 relative">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={300}
          height={200}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint="food dish"
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">{item.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-2 h-10 overflow-hidden">
          {item.description}
        </CardDescription>
        <div className="flex items-center justify-between mb-2">
          <p className="text-md font-semibold text-primary">${item.price.toFixed(2)}</p>
          {item.dietaryInfo && item.dietaryInfo.length > 0 && (
            <div className="flex space-x-1">
              {item.dietaryInfo.map(info => {
                let Icon = null;
                if (info.toLowerCase().includes('vegan') || info.toLowerCase().includes('vegetarian')) Icon = Leaf;
                if (info.toLowerCase().includes('gluten-free')) Icon = WheatOff;
                return Icon ? <Icon key={info} className="h-4 w-4 text-green-600" title={info} /> : null;
              })}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
