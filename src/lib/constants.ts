
import type { NavItem } from '@/lib/types';
import { Home, Store, UserCircle, Bot, LifeBuoy, LogIn, Briefcase, LogOut } from 'lucide-react';

export const NAV_LINKS_MAIN: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/restaurants', label: 'Restaurants', icon: Store },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const NAV_LINKS_USER_AUTHENTICATED: NavItem[] = [
  { href: '/account/profile', label: 'My Account', icon: UserCircle },
  // Vendor dashboard link could be conditional based on user role
  // { href: '/vendor/dashboard', label: 'Vendor Dashboard', icon: Briefcase },
  { href: '#', label: 'Logout', icon: LogOut }, // Placeholder, logout handled by context now
];

// This constant might not be directly used in Navbar if we use Dropdown for authenticated users
// but keeping it for conceptual clarity or other potential uses.
export const NAV_LINKS_AUTHENTICATED_MENU: NavItem[] = [
    { href: '/account/profile', label: 'My Account', icon: UserCircle },
    { href: '/vendor/dashboard', label: 'Vendor Dashboard', icon: Briefcase }, // Conditional
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
