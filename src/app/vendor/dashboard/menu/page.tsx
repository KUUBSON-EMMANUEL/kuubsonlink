
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { placeholderMenu as initialMenuCategories } from "@/lib/placeholder-data";
import type { MenuItemCategory, MenuItem } from "@/lib/types";
import { PlusCircle, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VendorMenuPage() {
  const { toast } = useToast();
  const [menuCategories, setMenuCategories] = useState<MenuItemCategory[]>(initialMenuCategories);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCategory: MenuItemCategory = {
      id: `cat-${Date.now()}`,
      name: newCategoryName,
      items: [],
    };
    setMenuCategories(prev => [newCategory, ...prev]);
    toast({
      title: "Category Added!",
      description: `Category "${newCategoryName}" has been successfully created.`,
    });
    setNewCategoryName("");
    setIsCategoryDialogOpen(false);
    setIsSubmitting(false);
    console.log("New category added (local state):", newCategory);
  };

  // Placeholder functions for item/category actions - to be implemented
  const handleEditCategory = (categoryId: string) => {
    toast({ title: "Coming Soon", description: `Edit functionality for category ${categoryId} is not yet implemented.`});
  };
  const handleDeleteCategory = (categoryId: string) => {
    toast({ title: "Coming Soon", description: `Delete functionality for category ${categoryId} is not yet implemented.`});
  };
  const handleViewItem = (itemId: string) => {
    toast({ title: "Coming Soon", description: `View functionality for item ${itemId} is not yet implemented.`});
  };
  const handleEditItem = (itemId: string) => {
    toast({ title: "Coming Soon", description: `Edit functionality for item ${itemId} is not yet implemented.`});
  };
  const handleDeleteItem = (itemId: string) => {
    toast({ title: "Coming Soon", description: `Delete functionality for item ${itemId} is not yet implemented.`});
  };
  const handleAddItemToCategory = (categoryName: string) => {
     toast({ title: "Coming Soon", description: `Add item to "${categoryName}" functionality is not yet implemented.`});
  };


  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Manage Your Menu</h1>
          <p className="text-md text-muted-foreground mt-1">Add, edit, and organize your delicious offerings.</p>
        </div>
        {/* This button is for "Add New Item" globally, which might be complex. 
            We'll focus on "Add New Category" first and then item addition within categories.
            For now, this button can be a placeholder or trigger category creation if simplified.
            Let's make it trigger "Add New Category" for now.
        */}
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogTrigger asChild>
             <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-primary">Add New Menu Category</DialogTitle>
              <DialogDescription>
                Enter the name for your new menu category. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryName" className="text-right">
                  Name
                </Label>
                <Input
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Desserts, Beverages"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleAddCategory} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {menuCategories.map(category => (
        <Card key={category.id} className="mb-8 shadow-md">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-2xl font-headline">{category.name}</CardTitle>
            <div>
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleEditCategory(category.id)}><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" onClick={() => handleDeleteCategory(category.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            {category.items.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img src={item.imageUrl} alt={item.name} data-ai-hint="food item" className="h-12 w-12 object-cover rounded-md"/>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-xs max-w-xs truncate">{item.description}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="mr-1" onClick={() => handleViewItem(item.id)}><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button variant="ghost" size="icon" className="mr-1" onClick={() => handleEditItem(item.id)}><Edit className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No items in this category. Add some!</p>
            )}
             <div className="mt-4 text-right">
                <Button variant="outline" size="sm" onClick={() => handleAddItemToCategory(category.name)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item to {category.name}
                </Button>
            </div>
          </CardContent>
        </Card>
      ))}
       <div className="mt-8 text-center">
            {/* This button is a duplicate of the header one if it's also for new categories.
                If this was meant for something else, we can adjust. For now, it's redundant.
                I'll remove it to avoid confusion, assuming the header button is primary for categories.
            */}
            {/* 
            <Button size="lg" variant="secondary">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Category
            </Button> 
            */}
        </div>
    </div>
  );
}
