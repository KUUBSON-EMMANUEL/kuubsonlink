'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS_MAIN, NAV_LINKS_GUEST } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Utensils } from 'lucide-react'; // Example Icon for Logo

export function Navbar() {
  const pathname = usePathname();
  // Placeholder for authentication state
  const isAuthenticated = false; 
  // const userRole = 'customer'; // 'customer' or 'vendor'

  // In a real app, NAV_LINKS_USER_AUTHENTICATED and NAV_LINKS_VENDOR_AUTHENTICATED would be used based on auth state and role.

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Utensils className="h-8 w-8 text-primary" />
          <span className="text-2xl font-headline font-bold text-primary">VendorLink</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {NAV_LINKS_MAIN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted hover:text-accent-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              {/* Example: Show My Account if logged in */}
              {/* <Link href="/account/profile">
                <Button variant="ghost" size="sm">My Account</Button>
              </Link> */}
            </>
          ) : (
            NAV_LINKS_GUEST.map((item) => (
              <Link key={item.href} href={item.href}>
                 <Button variant={item.href === '/vendor/register' ? "default" : "outline"} size="sm" className="flex items-center gap-1.5">
                   {item.icon && <item.icon className="h-4 w-4" />}
                   {item.label}
                 </Button>
              </Link>
            ))
          )}
           {/* Mobile menu button - can be implemented with Sheet component */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Utensils className="h-5 w-5" /> {/* Placeholder icon, usually Menu icon */}
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
