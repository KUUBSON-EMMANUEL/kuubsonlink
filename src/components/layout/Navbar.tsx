
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS_MAIN, NAV_LINKS_GUEST } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Utensils, LogOut, UserCircle, Briefcase, Shield } from 'lucide-react'; // Ensured Shield is imported
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout, loading } = useAuth();

  let isVendor = false;
  let isAdmin = false;

  if (currentUser) {
    const displayName = currentUser.displayName || "";
    const email = currentUser.email || "";
    isVendor = displayName.toLowerCase().includes('vendor') || 
               email.toLowerCase() === 'vendor@example.com';
    
    isAdmin = email.toLowerCase() === 'admin@example.com' || 
              displayName.toLowerCase().includes('admin');
  }


  const getAvatarFallback = (displayName?: string | null) => {
    if (!displayName) return "U";
    const names = displayName.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  };


  if (loading) {
    return (
      <header className="bg-card shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="h-8 w-8 text-primary" />
            <span className="text-2xl font-headline font-bold text-primary">KuubsonLink</span>
          </Link>
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Utensils className="h-8 w-8 text-primary" />
          <span className="text-2xl font-headline font-bold text-primary">KuubsonLink</span>
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
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || "User"} data-ai-hint="person avatar"/>
                    <AvatarFallback>{getAvatarFallback(currentUser.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/account/profile" className="flex items-center w-full">
                    <UserCircle className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                {isVendor && (
                  <DropdownMenuItem asChild>
                    <Link href="/vendor/dashboard" className="flex items-center w-full">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Vendor Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="flex items-center w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <Button variant="ghost" size="icon" className="md:hidden">
            {/* Using Utensils for mobile menu toggle for consistency, can be changed */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
