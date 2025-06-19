
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Assuming you have admin role check in useAuth or a separate hook
import { Loader2, Users, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// In a real app, you'd fetch this data and also have more robust role checking.
const placeholderUsers = [
  { id: "usr_1", name: "Alice Wonderland", email: "alice@example.com", role: "Customer", joined: "2024-03-15" },
  { id: "usr_2", name: "Bob The Builder", email: "bob@example.com", role: "Customer", joined: "2024-02-10" },
  { id: "usr_3", name: "Vendor Admin", email: "vendor@example.com", role: "Vendor", joined: "2024-01-20" },
  { id: "usr_4", name: "Charlie Chaplin", email: "charlie@example.com", role: "Customer", joined: "2023-12-01" },
];


export default function AdminUserManagementPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  // Basic admin check (placeholder - replace with actual role-based logic)
  const isAdmin = currentUser?.email === "admin@example.com" || currentUser?.displayName?.toLowerCase().includes("admin");

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.push("/auth/login");
      } else if (!isAdmin) {
        // If not an admin, redirect to a general page or show an unauthorized message
        router.push("/"); // Or an "/unauthorized" page
      }
    }
  }, [currentUser, authLoading, router, isAdmin]);

  if (authLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
     return (
      <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500 text-center">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-destructive flex items-center justify-center">
                <ShieldAlert className="mr-2 h-8 w-8" /> Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">You do not have permission to view this page.</p>
            <Button onClick={() => router.push('/')}>Go to Homepage</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <Users className="mr-3 h-10 w-10" /> User Management
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          View, manage, and monitor user accounts on the platform.
        </p>
      </header>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Placeholder for user data table and management tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            In a real application, a table with user details (Name, Email, Role, Joined Date, Actions like Edit/Suspend/Delete) would be displayed here.
            This section would also include search and filtering capabilities.
          </p>
          <div className="mt-6 p-4 bg-secondary/30 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Example Users (Conceptual):</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {placeholderUsers.map(user => (
                    <li key={user.id}>{user.name} ({user.email}) - Role: {user.role}</li>
                ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
