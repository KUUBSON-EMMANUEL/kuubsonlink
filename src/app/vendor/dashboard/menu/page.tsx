
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function VendorMenuPage() {
  const { toast } = useToast();
  const [menuCategories, setMenuCategories] = useState<MenuItemCategory[]>(initialMenuCategories);
  
  // State for Category Dialog
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  // State for Item Dialog
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [currentItemCategoryId, setCurrentItemCategoryId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImageUrl, setNewItemImageUrl] = useState("https://placehold.co/300x200.png");
  const [newItemDietaryInfo, setNewItemDietaryInfo] = useState("");
  const [isSubmittingItem, setIsSubmittingItem] = useState(false);
  // We'll add editingItem state later if we implement edit item functionality

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingCategory(true);
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
    setIsSubmittingCategory(false);
  };

  const handleOpenAddItemDialog = (categoryId: string) => {
    setCurrentItemCategoryId(categoryId);
    setNewItemName("");
    setNewItemDescription("");
    setNewItemPrice("");
    setNewItemImageUrl("https://placehold.co/300x200.png");
    setNewItemDietaryInfo("");
    // setEditingItem(null); // Reset if we were editing
    setIsItemDialogOpen(true);
  };

  const handleSaveItem = async () => {
    if (!newItemName.trim() || !newItemPrice.trim() || !currentItemCategoryId) {
      toast({
        title: "Error",
        description: "Item name and price are required.",
        variant: "destructive",
      });
      return;
    }
    const price = parseFloat(newItemPrice);
    if (isNaN(price) || price < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingItem(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      description: newItemDescription,
      price: price,
      imageUrl: newItemImageUrl || "https://placehold.co/300x200.png",
      dietaryInfo: newItemDietaryInfo.split(',').map(info => info.trim()).filter(info => info),
    };

    setMenuCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === currentItemCategoryId
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    );

    toast({
      title: "Item Added!",
      description: `"${newItemName}" has been successfully added.`,
    });

    setIsItemDialogOpen(false);
    setIsSubmittingItem(false);
    setCurrentItemCategoryId(null); // Reset after use
  };


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

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Manage Your Menu</h1>
          <p className="text-md text-muted-foreground mt-1">Add, edit, and organize your delicious offerings.</p>
        </div>
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
                 <Button type="button" variant="outline" disabled={isSubmittingCategory}>Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleAddCategory} disabled={isSubmittingCategory}>
                {isSubmittingCategory && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Item Dialog */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="font-headline text-primary">Add New Menu Item</DialogTitle>
                <DialogDescription>
                    Fill in the details for the new item. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemName" className="text-right">Name</Label>
                    <Input id="itemName" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="col-span-3" placeholder="e.g., Classic Burger"/>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="itemDescription" className="text-right pt-2">Description</Label>
                    <Textarea id="itemDescription" value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)} className="col-span-3" placeholder="e.g., Juicy beef patty, lettuce, tomato, cheese" rows={3}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemPrice" className="text-right">Price ($)</Label>
                    <Input id="itemPrice" type="number" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} className="col-span-3" placeholder="e.g., 12.99"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemImageUrl" className="text-right">Image URL</Label>
                    <Input id="itemImageUrl" value={newItemImageUrl} onChange={(e) => setNewItemImageUrl(e.target.value)} className="col-span-3" placeholder="https://placehold.co/300x200.png"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="itemDietaryInfo" className="text-right">Dietary Info</Label>
                    <Input id="itemDietaryInfo" value={newItemDietaryInfo} onChange={(e) => setNewItemDietaryInfo(e.target.value)} className="col-span-3" placeholder="e.g., Vegan, Gluten-Free (comma-separated)"/>
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" disabled={isSubmittingItem} onClick={() => setIsItemDialogOpen(false)}>Cancel</Button>
                <Button type="button" onClick={handleSaveItem} disabled={isSubmittingItem}>
                    {isSubmittingItem && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Item
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>


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
                    <TableHead>Dietary</TableHead>
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
                      <TableCell className="text-xs">
                        {item.dietaryInfo?.join(', ')}
                      </TableCell>
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
                <Button variant="outline" size="sm" onClick={() => handleOpenAddItemDialog(category.id)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item to {category.name}
                </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

    