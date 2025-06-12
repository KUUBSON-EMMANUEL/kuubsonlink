import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-headline font-semibold text-primary mb-2">KuubsonLink</h3>
            <p className="text-sm text-muted-foreground">Your gateway to delicious food, delivered.</p>
          </div>
          <div>
            <h4 className="text-md font-headline font-semibold text-foreground mb-2">Quick Links</h4>
            <ul className="space-y-1">
              {FOOTER_LINKS.slice(0,3).map(link => (
                 <li key={link.href}>
                   <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                     {link.label}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-headline font-semibold text-foreground mb-2">Legal</h4>
            <ul className="space-y-1">
              {FOOTER_LINKS.slice(3).map(link => (
                 <li key={link.href}>
                   <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                     {link.label}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KuubsonLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
