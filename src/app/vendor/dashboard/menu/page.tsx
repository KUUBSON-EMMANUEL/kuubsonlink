import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { placeholderMenu } from "@/lib/placeholder-data";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";

export default function VendorMenuPage() {
  // This is placeholder data. In a real app, this would be fetched for the specific vendor.
  const menuCategories = placeholderMenu;

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Manage Your Menu</h1>
          <p className="text-md text-muted-foreground mt-1">Add, edit, and organize your delicious offerings.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </header>

      {menuCategories.map(category => (
        <Card key={category.id} className="mb-8 shadow-md">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-2xl font-headline">{category.name}</CardTitle>
            <div>
              <Button variant="ghost" size="icon" className="mr-2"><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive-foreground hover:bg-destructive"><Trash2 className="h-4 w-4" /></Button>
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
                        <Button variant="ghost" size="icon" className="mr-1"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button variant="ghost" size="icon" className="mr-1"><Edit className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No items in this category. Add some!</p>
            )}
             <div className="mt-4 text-right">
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item to {category.name}
                </Button>
            </div>
          </CardContent>
        </Card>
      ))}
       <div className="mt-8 text-center">
            <Button size="lg" variant="secondary">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Category
            </Button>
        </div>
    </div>
  );
}
