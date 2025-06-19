
import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/useAuth'; 

export const metadata: Metadata = {
  title: 'VendorLink',
  description: 'Comprehensive and user-friendly delivery website for food vendors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased text-foreground min-h-screen flex flex-col" data-ai-hint="two people">
        <AuthProvider> 
          <AppShell>
            {children}
          </AppShell>
          <Toaster />
        </AuthProvider> 
      </body>
    </html>
  );
}
