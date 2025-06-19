
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
  { id: "usr_5", name: "Admin SuperUser", email: "admin@example.com", role: "Admin", joined: "2023-11-01" },
];


export default function AdminUserManagementPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  // Basic admin check (placeholder - replace with actual role-based logic)
  let isAdmin = false;
  if (currentUser) {
    const displayName = currentUser.displayName || "";
    const email = currentUser.email || "";
    isAdmin = email.toLowerCase() === "admin@example.com" ||
              displayName.toLowerCase().includes("admin");
  }


  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.push("/auth/login");
      } else if (!isAdmin) {
        // No automatic redirect for non-admins, just show access denied message.
        // router.push("/"); 
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
        <Card className="max-w-md mx-auto shadow-lg border-destructive">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-destructive flex items-center justify-center">
                <ShieldAlert className="mr-2 h-8 w-8" /> Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">You do not have permission to view this page.</p>
            <Button onClick={() => router.push('/')} variant="outline">Go to Homepage</Button>
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
          <CardDescription>A list of registered users on the platform. (Placeholder data)</CardDescription>
        </CardHeader>
        <CardContent>
          {placeholderUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {placeholderUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="link" size="sm" className="text-primary hover:underline">View</Button>
                        {/* Add more actions like Edit, Suspend later */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No users found.</p>
          )}
          <div className="mt-6 p-4 bg-secondary/30 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Developer Note:</h3>
            <p className="text-xs text-muted-foreground">
              This page displays placeholder data. In a real application, user data would be fetched from a backend,
              and actions like Edit, Suspend, Delete would be implemented with proper authentication and authorization.
              Role management would also be more robust.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
