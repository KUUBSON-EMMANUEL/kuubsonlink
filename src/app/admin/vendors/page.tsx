
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, MoreHorizontal, Eye, CheckCircle, XCircle, ShieldAlert, Loader2, User, Mail, MapPin, Hash, CalendarDays, Utensils, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VendorStatus = "Active" | "Pending Approval" | "Suspended";

interface AdminVendor {
  id: string;
  restaurantName: string;
  contactName: string;
  contactEmail: string;
  address: string;
  cuisineType: string;
  status: VendorStatus;
  joinedDate: string;
}

const placeholderAdminVendors: AdminVendor[] = [
  { id: "vendor_1", restaurantName: "The Gourmet Kitchen", contactName: "John Chef", contactEmail: "john.chef@example.com", address: "123 Foodie Lane, Gourmet City", cuisineType: "Modern European", status: "Active", joinedDate: "2024-01-15" },
  { id: "vendor_2", restaurantName: "Spice Route Express", contactName: "Aisha Khan", contactEmail: "spice.route@example.com", address: "456 Spice Avenue, Flavor Town", cuisineType: "Asian Fusion", status: "Active", joinedDate: "2024-02-10" },
  { id: "vendor_3", restaurantName: "Pizza Heaven Pizzeria", contactName: "Mario Rossi", contactEmail: "pizza.heaven@example.com", address: "789 Pizza Street, Cheesy Ville", cuisineType: "Italian", status: "Pending Approval", joinedDate: "2024-03-01" },
  { id: "vendor_4", restaurantName: "Burger Barn", contactName: "Patty O'Furniture", contactEmail: "burgers@example.com", address: "101 Burger Blvd, Pattyville", cuisineType: "American Fast Food", status: "Suspended", joinedDate: "2023-12-05" },
  { id: "vendor_5", restaurantName: "Taco Town", contactName: "Carlos Delgado", contactEmail: "tacos@example.com", address: "222 Taco Terrace, Salsaburg", cuisineType: "Mexican", status: "Pending Approval", joinedDate: "2024-03-20" },
];

const getStatusBadgeVariant = (status: VendorStatus): "default" | "destructive" | "secondary" | "outline" => {
  switch (status) {
    case "Active":
      return "default";
    case "Pending Approval":
      return "secondary";
    case "Suspended":
      return "destructive";
    default:
      return "outline";
  }
};

export default function AdminVendorManagementPage() {
  const { toast } = useToast();
  const [vendors, setVendors] = useState<AdminVendor[]>(placeholderAdminVendors);
  const [isLoadingAction, setIsLoadingAction] = useState<string | null>(null);
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  const [selectedVendorForView, setSelectedVendorForView] = useState<AdminVendor | null>(null);

  const handleAction = async (vendorId: string, actionType: "approve" | "suspend" | "view") => {
    if (actionType === "view") {
      const vendorToView = vendors.find(v => v.id === vendorId);
      if (vendorToView) {
        setSelectedVendorForView(vendorToView);
        setIsViewDetailsDialogOpen(true);
      } else {
        toast({ title: "Error", description: "Vendor not found.", variant: "destructive" });
      }
      return;
    }

    setIsLoadingAction(`${vendorId}-${actionType}`);
    await new Promise(resolve => setTimeout(resolve, 750));

    if (actionType === "approve") {
      setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: "Active" } : v));
      toast({ title: "Vendor Approved", description: `Vendor ${vendors.find(v=>v.id === vendorId)?.restaurantName} is now active.` });
    } else if (actionType === "suspend") {
      setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: "Suspended" } : v));
      toast({ title: "Vendor Suspended", description: `Vendor ${vendors.find(v=>v.id === vendorId)?.restaurantName} has been suspended.`, variant: "destructive" });
    }
    setIsLoadingAction(null);
  };


  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <Briefcase className="mr-3 h-10 w-10" /> Vendor Management
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Oversee and manage all vendor accounts on the platform.
        </p>
      </header>

      <Card className="shadow-md bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Vendor List</CardTitle>
          <CardDescription>A list of all registered vendors. (Placeholder data)</CardDescription>
        </CardHeader>
        <CardContent>
          {vendors.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurant Name</TableHead>
                    <TableHead>Contact Email</TableHead>
                    <TableHead>Cuisine</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border">
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium text-foreground">{vendor.restaurantName}</TableCell>
                      <TableCell className="text-muted-foreground">{vendor.contactEmail}</TableCell>
                      <TableCell className="text-muted-foreground">{vendor.cuisineType}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{vendor.joinedDate}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getStatusBadgeVariant(vendor.status)}>{vendor.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" disabled={!!isLoadingAction && isLoadingAction.startsWith(vendor.id) && !isLoadingAction.endsWith("view")}>
                              {(isLoadingAction && isLoadingAction.startsWith(vendor.id) && !isLoadingAction.endsWith("view")) ? <Loader2 className="h-4 w-4 animate-spin"/> : <MoreHorizontal className="h-4 w-4" />}
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleAction(vendor.id, "view")}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            {vendor.status === "Pending Approval" && (
                              <DropdownMenuItem onClick={() => handleAction(vendor.id, "approve")} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve
                              </DropdownMenuItem>
                            )}
                            {vendor.status === "Active" && (
                              <DropdownMenuItem onClick={() => handleAction(vendor.id, "suspend")} className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                                <ShieldAlert className="mr-2 h-4 w-4" /> Suspend
                              </DropdownMenuItem>
                            )}
                             {vendor.status === "Suspended" && (
                              <DropdownMenuItem onClick={() => handleAction(vendor.id, "approve")} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                                <CheckCircle className="mr-2 h-4 w-4" /> Re-activate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No vendors found.</p>
          )}
        </CardContent>
      </Card>

      {selectedVendorForView && (
        <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-primary flex items-center">
                <Briefcase className="mr-2 h-6 w-6" /> Vendor Details: {selectedVendorForView.restaurantName}
              </DialogTitle>
              <DialogDescription>
                Detailed information for vendor ID: {selectedVendorForView.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="flex items-start">
                <Tag className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Vendor ID</p>
                  <p className="text-sm font-medium text-foreground">{selectedVendorForView.id}</p>
                </div>
              </div>
               <div className="flex items-start">
                <User className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Contact Name</p>
                  <p className="text-sm font-medium text-foreground">{selectedVendorForView.contactName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                 <div>
                  <p className="text-xs text-muted-foreground">Contact Email</p>
                  <p className="text-sm font-medium text-foreground">{selectedVendorForView.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                 <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground">{selectedVendorForView.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Utensils className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Cuisine Type</p>
                  <p className="text-sm font-medium text-foreground">{selectedVendorForView.cuisineType}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarDays className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Joined Date</p>
                  <p className="text-sm font-medium text-foreground">{selectedVendorForView.joinedDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="mr-3 h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant={getStatusBadgeVariant(selectedVendorForView.status)} className="text-sm">{selectedVendorForView.status}</Badge>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

       <div className="mt-6 p-4 bg-secondary/30 rounded-md">
        <h3 className="font-semibold text-lg mb-2 font-headline">Developer Note:</h3>
        <p className="text-xs text-muted-foreground">
          This page displays placeholder vendor data. Actions like "Approve", "Suspend", and "Re-activate"
          update the status locally for demonstration. "View Details" now opens a dialog with more information.
          In a real application, these actions would interact with a backend service.
        </p>
      </div>
    </div>
  );
}

