import type { Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, UserCircle } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="mb-4 bg-secondary/30 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle className="h-6 w-6 mr-2 text-muted-foreground" />
            <CardTitle className="text-md font-semibold font-body">{review.customerName}</CardTitle>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground pt-1">{new Date(review.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
