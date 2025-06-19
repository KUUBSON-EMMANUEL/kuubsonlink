
"use client";

// Admin check is now handled by /admin/layout.tsx

import { Loader2, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth"; // Still needed for potential future admin-specific actions
import { useRouter } from "next/navigation"; // Potentially for navigation actions
import { useEffect } from "react";


const placeholderUsers = [
  { id: "usr_1", name: "Alice Wonderland", email: "alice@example.com", role: "Customer", joined: "2024-03-15" },
  { id: "usr_2", name: "Bob The Builder", email: "bob@example.com", role: "Customer", joined: "2024-02-10" },
  { id: "usr_3", name: "Vendor Example", email: "vendor@example.com", role: "Vendor", joined: "2024-01-20" },
  { id: "usr_4", name: "Charlie Chaplin", email: "charlie@example.com", role: "Customer", joined: "2023-12-01" },
  { id: "usr_5", name: "Admin Kuubson", email: "admin@anaskuubson.gmail.com", role: "Admin", joined: "2023-11-01" },
];


export default function AdminUserManagementPage() {
  const { currentUser, loading: authLoading } = useAuth(); // Keep auth info if needed for specific user actions
  const router = useRouter(); // Keep router if needed for navigation

  // The primary loading and auth checks are handled by the layout.
  // This page assumes it's rendered for an authenticated admin.

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
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

      <Card className="shadow-md bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-headline">User List</CardTitle>
          <CardDescription>A list of registered users on the platform. (Placeholder data)</CardDescription>
        </CardHeader>
        <CardContent>
          {placeholderUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</TableHead>
                    <TableHead className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border">
                  {placeholderUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.name}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.role}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.joined}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="link" size="sm" className="text-primary hover:underline">View</Button>
                        {/* Add more actions like Edit, Suspend later */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No users found.</p>
          )}
          <div className="mt-6 p-4 bg-secondary/30 rounded-md">
            <h3 className="font-semibold text-lg mb-2 font-headline">Developer Note:</h3>
            <p className="text-xs text-muted-foreground">
              This page displays placeholder data. In a real application, user data would be fetched from a backend,
              and actions like Edit, Suspend, Delete would be implemented.
              The admin check is now centralized in the admin layout.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
