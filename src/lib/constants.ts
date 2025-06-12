import type { NavItem } from '@/lib/types';
import { Home, Store, UserCircle, Bot, LifeBuoy, LogIn, Briefcase } from 'lucide-react';

export const NAV_LINKS_MAIN: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/restaurants', label: 'Restaurants', icon: Store },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const NAV_LINKS_USER_AUTHENTICATED: NavItem[] = [
  { href: '/account/profile', label: 'My Account', icon: UserCircle },
  // Add more authenticated user links here, e.g., orders
];

export const NAV_LINKS_VENDOR_AUTHENTICATED: NavItem[] = [
  { href: '/vendor/dashboard', label: 'Vendor Dashboard', icon: Briefcase },
];


export const NAV_LINKS_GUEST: NavItem[] = [
  { href: '/auth/login', label: 'Login', icon: LogIn },
  { href: '/vendor/register', label: 'Become a Vendor', icon: Briefcase },
];

export const FOOTER_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];
