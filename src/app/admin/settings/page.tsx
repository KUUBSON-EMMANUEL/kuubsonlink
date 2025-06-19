
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Brush, ShieldAlert, Mail, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const handlePlaceholderSave = (settingName: string) => {
    toast({
      title: "Setting Saved (Placeholder)",
      description: `${settingName} settings would be saved to a backend in a real application.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary flex items-center">
          <Settings className="mr-3 h-10 w-10" /> Platform Settings
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage global configurations for VendorLink.
        </p>
      </header>

      <div className="space-y-10">
        {/* General Settings */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline">General Settings</CardTitle>
            <CardDescription>Basic platform information and operational parameters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="VendorLink" disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adminEmail">Default Admin Email</Label>
              <Input id="adminEmail" type="email" defaultValue="support@vendorlink.com" disabled />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="registrationOpen" defaultChecked disabled />
              <Label htmlFor="registrationOpen" className="text-sm font-medium">
                Allow New User Registrations
              </Label>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button onClick={() => handlePlaceholderSave("General")} disabled>Save General Settings</Button>
          </CardFooter>
        </Card>

        {/* Theme Customization Placeholder */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><Brush className="mr-2 h-5 w-5 text-primary" /> Theme Customization</CardTitle>
            <CardDescription>Modify colors and appearance (Illustrative).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
              <Input id="primaryColor" defaultValue="16 80% 50%" disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="backgroundColor">Background Color (HSL)</Label>
              <Input id="backgroundColor" defaultValue="20 67% 92%" disabled />
            </div>
            <p className="text-xs text-muted-foreground">Note: Theme colors are managed in `src/app/globals.css` via CSS variables.</p>
          </CardContent>
           <CardFooter className="border-t pt-6">
            <Button onClick={() => handlePlaceholderSave("Theme")} disabled>Save Theme Settings</Button>
          </CardFooter>
        </Card>

        {/* Maintenance Mode */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-destructive" /> Maintenance Mode</CardTitle>
            <CardDescription>Temporarily disable access to the site for maintenance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="maintenanceMode" defaultChecked={false} disabled />
              <Label htmlFor="maintenanceMode" className="text-sm font-medium">
                Enable Maintenance Mode
              </Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
              <Input id="maintenanceMessage" defaultValue="Site is currently down for maintenance. We'll be back shortly!" disabled />
            </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
            <Button onClick={() => handlePlaceholderSave("Maintenance")} disabled>Update Maintenance Mode</Button>
          </CardFooter>
        </Card>
        
        {/* Email Settings Placeholder */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><Mail className="mr-2 h-5 w-5 text-primary" /> Email Notifications</CardTitle>
            <CardDescription>Configure email server settings and templates (Illustrative).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="smtpServer">SMTP Server</Label>
              <Input id="smtpServer" placeholder="smtp.example.com" disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input id="smtpUser" placeholder="user@example.com" disabled />
            </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
            <Button onClick={() => handlePlaceholderSave("Email")} disabled>Save Email Settings</Button>
          </CardFooter>
        </Card>

      </div>

      <div className="mt-10 p-4 bg-secondary/30 rounded-md text-sm">
        <Info className="inline h-5 w-5 mr-2 mb-0.5 text-primary" />
        <strong>Developer Note:</strong> The settings on this page are illustrative placeholders.
        Implementing these features would require backend integration and database storage.
        The save buttons are currently disabled.
      </div>
    </div>
  );
}
