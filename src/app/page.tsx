
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShoppingBag, Truck, Users } from 'lucide-react';

const features = [
  {
    icon: ShoppingBag,
    title: "Diverse Cuisines",
    description: "Explore a wide variety of dishes from local and international vendors.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your favorite meals delivered to your doorstep quickly and reliably.",
  },
  {
    icon: Users,
    title: "Support Local",
    description: "Empower local food businesses by ordering through VendorLink.",
  },
  {
    icon: CheckCircle,
    title: "Easy Ordering",
    description: "Intuitive interface for a seamless and enjoyable ordering experience.",
  }
];

export default function HomePage() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 animate-in slide-in-from-bottom-12 duration-700">
            Discover Flavors, Delivered.
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom-10 duration-700 delay-200">
            VendorLink connects you with the best local food vendors. Order your favorite meals with ease and enjoy fast, reliable delivery.
          </p>
          <div className="space-x-4 animate-in fade-in duration-700 delay-400">
            <Link href="/restaurants">
              <Button size="lg" className="font-semibold">
                Find Restaurants <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/vendor/register">
              <Button size="lg" variant="outline" className="font-semibold">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-12">
            Why Choose VendorLink?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-secondary/50 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Sign up today and explore a world of culinary delights or grow your business by joining our platform.
          </p>
          <div className="space-x-4">
            <Link href="/auth/signup">
              <Button size="lg" variant="accent" className="font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
                Sign Up as Customer
              </Button>
            </Link>
            <Link href="/vendor/register">
              <Button size="lg" className="font-semibold">
                Register Your Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
