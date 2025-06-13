
"use client"; // Added this line

import { VendorRegistrationForm } from '@/components/forms/VendorRegistrationForm';

export default function VendorRegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <VendorRegistrationForm />
    </div>
  );
}
