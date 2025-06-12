import type { Vendor, MenuItemCategory, Review } from '@/lib/types';

export const placeholderVendors: Vendor[] = [
  {
    id: '1',
    name: 'The Gourmet Kitchen',
    description: 'Serving delicious, locally-sourced meals with a modern twist. Perfect for a hearty lunch or a delightful dinner.',
    cuisine: 'Modern European',
    rating: 4.5,
    reviewCount: 120,
    imageUrl: 'https://placehold.co/600x400.png',
    operatingHours: 'Mon-Sat: 11am - 10pm',
    address: '123 Foodie Lane, Gourmet City',
    contact: 'vendor1@example.com',
    slug: 'the-gourmet-kitchen'
  },
  {
    id: '2',
    name: 'Spice Route Express',
    description: 'Authentic Asian flavors that will transport your taste buds. Quick, fresh, and packed with spice!',
    cuisine: 'Asian Fusion',
    rating: 4.8,
    reviewCount: 250,
    imageUrl: 'https://placehold.co/600x400.png',
    operatingHours: 'Tue-Sun: 12pm - 9pm',
    address: '456 Spice Avenue, Flavor Town',
    contact: 'vendor2@example.com',
    slug: 'spice-route-express'
  },
  {
    id: '3',
    name: 'Pizza Heaven',
    description: 'Classic and creative pizzas made with fresh dough and premium toppings. Your go-to for pizza night.',
    cuisine: 'Italian',
    rating: 4.2,
    reviewCount: 95,
    imageUrl: 'https://placehold.co/600x400.png',
    operatingHours: 'Everyday: 10am - 11pm',
    address: '789 Pizza Street, Cheesy Ville',
    contact: 'vendor3@example.com',
    slug: 'pizza-heaven'
  },
];

export const placeholderMenu: MenuItemCategory[] = [
  {
    id: 'cat1',
    name: 'Appetizers',
    items: [
      { id: 'item1', name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.', price: 8.99, imageUrl: 'https://placehold.co/300x200.png', dietaryInfo: ['Vegetarian'] },
      { id: 'item2', name: 'Spring Rolls', description: 'Crispy vegetarian spring rolls served with sweet chili sauce.', price: 7.50, imageUrl: 'https://placehold.co/300x200.png', dietaryInfo: ['Vegan', 'Vegetarian'] },
    ],
  },
  {
    id: 'cat2',
    name: 'Main Courses',
    items: [
      { id: 'item3', name: 'Grilled Salmon', description: 'Perfectly grilled salmon fillet with roasted vegetables and lemon butter sauce.', price: 18.99, imageUrl: 'https://placehold.co/300x200.png' },
      { id: 'item4', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and fresh basil.', price: 12.00, imageUrl: 'https://placehold.co/300x200.png', dietaryInfo: ['Vegetarian'] },
      { id: 'item5', name: 'Chicken Pad Thai', description: 'Stir-fried rice noodles with chicken, tofu, peanuts, and tamarind sauce.', price: 14.50, imageUrl: 'https://placehold.co/300x200.png' },
    ],
  },
  {
    id: 'cat3',
    name: 'Desserts',
    items: [
      { id: 'item6', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.', price: 9.00, imageUrl: 'https://placehold.co/300x200.png' },
      { id: 'item7', name: 'Tiramisu', description: 'Classic Italian dessert with ladyfingers, coffee, mascarpone, and cocoa.', price: 8.50, imageUrl: 'https://placehold.co/300x200.png' },
    ],
  },
];

export const placeholderReviews: Review[] = [
  { id: 'rev1', customerName: 'Alice Smith', rating: 5, comment: 'Absolutely delicious! The Grilled Salmon was cooked to perfection. Will order again!', date: '2024-05-10' },
  { id: 'rev2', customerName: 'Bob Johnson', rating: 4, comment: 'Great Pad Thai, very authentic. Delivery was quick too.', date: '2024-05-08' },
  { id: 'rev3', customerName: 'Carol Williams', rating: 3, comment: 'Pizza was okay, a bit cold on arrival though.', date: '2024-05-05' },
];

export const getVendorBySlug = (slug: string): Vendor | undefined => {
  return placeholderVendors.find(vendor => vendor.slug === slug);
};
