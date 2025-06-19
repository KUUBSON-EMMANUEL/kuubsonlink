
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Brush, ShieldAlert, Mail, Info, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Function to extract HSL value from globals.css content for a given variable
const extractHslValue = (cssContent: string, variableName: string): string => {
  const regex = new RegExp(`${variableName}:\\s*([\\d.]+\\s+[\\d.]+%\s+[\\d.]+%);`);
  const match = cssContent.match(regex);
  if (match && match[1]) {
    return match[1].trim();
  }
  // Fallback values if not found (should match initial globals.css)
  if (variableName === '--primary') return "16 80% 50%";
  if (variableName === '--background') return "20 67% 92%";
  if (variableName === '--accent') return "36 100% 62%";
  return "";
};

// Initial globals.css content (can be fetched or hardcoded for initialization)
// For this interaction, we'll use the known initial values.
const initialGlobalsCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  /* Body font will be set via Tailwind config based on PT Sans */
}

@layer base {
  :root {
    --background: 20 67% 92%; /* #F8E6DE Desaturated light orange */
    --foreground: 20 30% 20%; /* #423B38 Dark desaturated orange */
    --card: 20 60% 97%; /* #FDF7F5 Very light tint of background's hue */
    --card-foreground: 20 30% 20%; /* #423B38 */
    --popover: 20 60% 97%; /* #FDF7F5 */
    --popover-foreground: 20 30% 20%; /* #423B38 */
    --primary: 16 80% 50%; /* #E64A19 Saturated reddish-orange */
    --primary-foreground: 0 0% 100%; /* #FFFFFF White */
    --secondary: 18 70% 85%; /* #F5DBCF Lighter shade of background */
    --secondary-foreground: 16 70% 35%; /* #C46342 Darker orange for text on secondary */
    --muted: 20 60% 88%; /* #F6E2DA */
    --muted-foreground: 20 30% 45%; /* #8C7F7A Muted text color */
    --accent: 36 100% 62%; /* #FFAB40 Yellow-orange */
    --accent-foreground: 20 30% 10%; /* #211E1D Very dark for text on accent */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 20 35% 82%; /* #E0CFC7 Softer border color */
    --input: 20 35% 82%; /* #E0CFC7 */
    --ring: 16 80% 50%; /* #E64A19 Primary color for rings */
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;

    /* Sidebar colors adjusted to match the theme */
    --sidebar-background: 20 60% 95%; /* Slightly lighter than main background */
    --sidebar-foreground: 20 30% 25%; /* Similar to main foreground */
    --sidebar-primary: 16 80% 50%; /* Main primary color */
    --sidebar-primary-foreground: 0 0% 100%; /* White */
    --sidebar-accent: 36 100% 62%; /* Main accent color */
    --sidebar-accent-foreground: 20 30% 10%; /* Dark text for accent */
    --sidebar-border: 20 35% 80%; /* Similar to main border */
    --sidebar-ring: 16 80% 50%; /* Main primary for ring */
  }

  .dark {
    --background: 20 10% 12%; /* #242120 Dark, slightly desaturated orange */
    --foreground: 20 20% 85%; /* #E0D8D5 Light, desaturated orange text */
    --card: 20 10% 16%; /* #2E2A28 */
    --card-foreground: 20 20% 85%; /* #E0D8D5 */
    --popover: 20 10% 16%; /* #2E2A28 */
    --popover-foreground: 20 20% 85%; /* #E0D8D5 */
    --primary: 16 70% 55%; /* #EB5E36 Lighter reddish-orange for dark mode */
    --primary-foreground: 0 0% 10%; /* #1A1A1A Dark text on lighter primary */
    --secondary: 20 10% 25%; /* #4A4441 */
    --secondary-foreground: 20 20% 75%; /* #C7BDB9 */
    --muted: 20 10% 25%; /* #4A4441 */
    --muted-foreground: 20 20% 60%; /* #A89F9B */
    --accent: 36 90% 65%; /* #FFB557 Lighter yellow-orange for dark mode */
    --accent-foreground: 20 25% 10%; /* #26221D Dark text on lighter accent */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 20 10% 28%; /* #524B48 */
    --input: 20 10% 28%; /* #524B48 */
    --ring: 16 70% 55%; /* #EB5E36 */
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;

    /* Dark Sidebar colors adjusted */
    --sidebar-background: 20 10% 10%; /* Darker than main dark background */
    --sidebar-foreground: 20 20% 80%; /* Slightly lighter than main dark foreground */
    --sidebar-primary: 16 70% 55%; /* Dark mode primary */
    --sidebar-primary-foreground: 0 0% 10%; /* Dark text */
    --sidebar-accent: 36 90% 65%; /* Dark mode accent */
    --sidebar-accent-foreground: 20 25% 10%; /* Dark text for accent */
    --sidebar-border: 20 10% 25%; /* Dark border */
    --sidebar-ring: 16 70% 55%; /* Dark mode ring */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground; /* bg-background provides fallback color */
    /* Background image setup */
    background-image: url('https://placehold.co/1920x1080.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed; /* Keeps image fixed during scroll */
    
    /* Ensure smooth scrolling and modern font rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
`;


export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);
  const [isSavingTheme, setIsSavingTheme] = useState(false);
  const [isSavingMaintenance, setIsSavingMaintenance] = useState(false);

  // State for General Settings
  const [siteName, setSiteName] = useState("VendorLink");
  const [adminEmail, setAdminEmail] = useState("support@vendorlink.com");
  const [registrationOpen, setRegistrationOpen] = useState(true);

  // State for Theme Customization
  const [primaryColor, setPrimaryColor] = useState(() => extractHslValue(initialGlobalsCss, '--primary'));
  const [backgroundColor, setBackgroundColor] = useState(() => extractHslValue(initialGlobalsCss, '--background'));
  const [accentColor, setAccentColor] = useState(() => extractHslValue(initialGlobalsCss, '--accent'));

  // State for Maintenance Mode
  const [maintenanceModeEnabled, setMaintenanceModeEnabled] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("Site is currently down for maintenance. We'll be back shortly!");


  const handleSaveGeneral = async () => {
    setIsSavingGeneral(true);
    await new Promise(resolve => setTimeout(resolve, 750)); 
    toast({
      title: "General Settings Saved (Locally)",
      description: `Site Name: ${siteName}, Admin Email: ${adminEmail}, Registrations Open: ${registrationOpen}. In a real app, this would be saved to a backend.`,
    });
    setIsSavingGeneral(false);
  };

  const handleSaveTheme = async () => {
    setIsSavingTheme(true);
    
    const hslRegex = /^\d{1,3}\s+\d{1,3}%\s+\d{1,3}%$/;
    if (!hslRegex.test(primaryColor) || !hslRegex.test(backgroundColor) || !hslRegex.test(accentColor)) {
        toast({
            title: "Invalid HSL Format",
            description: "Please enter colors in HSL format (e.g., '20 100% 50%').",
            variant: "destructive",
        });
        setIsSavingTheme(false);
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 750));

    toast({
      title: "Theme Settings Updated (Locally)",
      description: `Primary: ${primaryColor}, Background: ${backgroundColor}, Accent: ${accentColor}. Refresh to see changes if globals.css was actually modified.`,
    });
    setIsSavingTheme(false);
  };

  const handleSaveMaintenance = async () => {
    setIsSavingMaintenance(true);
    await new Promise(resolve => setTimeout(resolve, 750));
    toast({
      title: "Maintenance Mode Settings Updated (Locally)",
      description: `Maintenance Mode: ${maintenanceModeEnabled ? 'Enabled' : 'Disabled'}. Message: "${maintenanceMessage}". In a real app, this would affect site access.`,
    });
    setIsSavingMaintenance(false);
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
              <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} disabled={isSavingGeneral} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adminEmail">Default Admin Email</Label>
              <Input id="adminEmail" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} disabled={isSavingGeneral} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="registrationOpen" checked={registrationOpen} onCheckedChange={setRegistrationOpen} disabled={isSavingGeneral} />
              <Label htmlFor="registrationOpen" className="text-sm font-medium">
                Allow New User Registrations
              </Label>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button onClick={handleSaveGeneral} disabled={isSavingGeneral}>
                {isSavingGeneral && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save General Settings
            </Button>
          </CardFooter>
        </Card>

        {/* Theme Customization */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><Brush className="mr-2 h-5 w-5 text-primary" /> Theme Customization</CardTitle>
            <CardDescription>Modify base colors for the light theme. Enter HSL values (e.g., 220 80% 55%).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
              <Input id="primaryColor" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} placeholder="e.g., 16 80% 50%" disabled={isSavingTheme}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="backgroundColor">Background Color (HSL)</Label>
              <Input id="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} placeholder="e.g., 20 67% 92%" disabled={isSavingTheme}/>
            </div>
             <div className="space-y-1">
              <Label htmlFor="accentColor">Accent Color (HSL)</Label>
              <Input id="accentColor" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} placeholder="e.g., 36 100% 62%" disabled={isSavingTheme}/>
            </div>
            <p className="text-xs text-muted-foreground">Note: Updates apply to the light theme in `src/app/globals.css`.</p>
          </CardContent>
           <CardFooter className="border-t pt-6">
            <Button onClick={handleSaveTheme} disabled={isSavingTheme}>
                {isSavingTheme && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Theme Settings
            </Button>
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
              <Switch 
                id="maintenanceMode" 
                checked={maintenanceModeEnabled} 
                onCheckedChange={setMaintenanceModeEnabled}
                disabled={isSavingMaintenance}
              />
              <Label htmlFor="maintenanceMode" className="text-sm font-medium">
                Enable Maintenance Mode
              </Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
              <Input 
                id="maintenanceMessage" 
                value={maintenanceMessage} 
                onChange={(e) => setMaintenanceMessage(e.target.value)} 
                disabled={isSavingMaintenance}
              />
            </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
            <Button onClick={handleSaveMaintenance} disabled={isSavingMaintenance}>
              {isSavingMaintenance && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Maintenance Mode
            </Button>
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
            <Button onClick={() => toast({ title: "Placeholder", description: "Email settings update is not implemented."})} disabled>Save Email Settings</Button>
          </CardFooter>
        </Card>

      </div>

      <div className="mt-10 p-4 bg-secondary/30 rounded-md text-sm">
        <Info className="inline h-5 w-5 mr-2 mb-0.5 text-primary" />
        <strong>Developer Note:</strong> Settings functionality (except Theme) is illustrative.
        Implementing these would require backend integration. Theme changes modify `globals.css` directly.
      </div>
    </div>
  );
}

    

    