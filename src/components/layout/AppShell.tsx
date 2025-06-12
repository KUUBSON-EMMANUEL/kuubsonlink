import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-background/80 p-4 md:p-6 rounded-lg shadow-xl">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
