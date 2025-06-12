import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon?: LucideIcon;
  match?: (pathname: string) => boolean; // Optional function to determine active state
};

export type Vendor = {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  operatingHours: string;
  address: string;
  contact: string;
  slug: string;
};

export type MenuItemCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dietaryInfo?: string[]; // e.g., ["Vegan", "Gluten-Free"]
};

export type Review = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
};
