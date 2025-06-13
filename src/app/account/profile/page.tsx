
"use client"; // Make this a client component to use hooks

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Edit3, MapPin, CreditCard, ShoppingBag, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"; // Import useAuth
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function CustomerProfilePage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("(555) 987-6543"); // Placeholder, ideally from user profile
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");


  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/auth/login'); // Redirect if not logged in
    }
    if (currentUser) {
      setName(currentUser.displayName || "Kuubson Frankie");
      // setEmail(currentUser.email || "alex.customer@example.com"); // Email is from currentUser.email
      // setAvatarUrl(currentUser.photoURL || "https://placehold.co/100x100.png");
      // setInitials(getAvatarFallback(currentUser.displayName));
    }
  }, [currentUser, authLoading, router]);
  
  const getAvatarFallback = (displayName?: string | null) => {
    if (!displayName) return "U";
    const names = displayName.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  };


  const handleSaveChanges = async () => {
    if (!currentUser) return;
    setIsPending(true);
    try {
      // Update profile (name, phone - phone needs backend)
      if (currentUser.displayName !== name) {
        await updateProfile(currentUser, { displayName: name });
      }
      // In a real app, phone number update would involve a backend call
      // and possibly verification.

      toast({ title: "Profile Updated", description: "Your personal information has been saved." });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({ title: "Error", description: error.message || "Could not update profile.", variant: "destructive" });
    }
    setIsPending(false);
  };

  const handleChangePassword = async () => {
    if (!currentUser || !currentUser.email) {
        toast({ title: "Error", description: "User not found or email missing.", variant: "destructive"});
        return;
    }
    if (newPassword !== confirmNewPassword) {
        toast({ title: "Error", description: "New passwords do not match.", variant: "destructive"});
        return;
    }
    if (newPassword.length < 6) {
        toast({ title: "Error", description: "New password must be at least 6 characters.", variant: "destructive"});
        return;
    }

    setIsPending(true);
    try {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        toast({ title: "Password Updated", description: "Your password has been changed successfully." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    } catch (error: any) {
        console.error("Error changing password:", error);
        let errorMessage = "Could not change password. ";
        if (error.code === 'auth/wrong-password') {
            errorMessage += "Incorrect current password.";
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage += "Too many attempts. Please try again later.";
        } else {
            errorMessage += error.message || "Please try again.";
        }
        toast({ title: "Password Change Failed", description: errorMessage, variant: "destructive" });
    }
    setIsPending(false);
  };


  const accountNav = [
    { name: "Order History", href: "/account/order-history", icon: ShoppingBag },
    { name: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/account/payment-methods", icon: CreditCard },
    { name: "Favorite Vendors", href: "/account/favorites", icon: Heart },
  ];

  if (authLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary">My Account</h1>
        <p className="text-lg text-muted-foreground mt-1">Manage your profile, orders, and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
            <Card className="shadow-md">
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                    <AvatarImage src={currentUser.photoURL || "https://placehold.co/100x100.png"} alt={currentUser.displayName || "User"} data-ai-hint="person avatar" />
                    <AvatarFallback className="text-2xl bg-muted">{getAvatarFallback(currentUser.displayName)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-headline">{currentUser.displayName || "User Name"}</CardTitle>
                    <CardDescription>{currentUser.email}</CardDescription>
                    {/* <CardDescription className="text-xs">Joined: {currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}</CardDescription> */}
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => toast({title: "Feature Coming Soon", description: "Avatar editing will be available in a future update."})}>
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Avatar
                    </Button>
                </CardContent>
            </Card>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                {accountNav.map(item => (
                    <Link key={item.name} href={item.href}>
                        <Button variant="ghost" className="w-full justify-start">
                            <item.icon className="mr-2 h-4 w-4 text-primary" /> {item.name}
                        </Button>
                    </Link>
                ))}
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={currentUser.email || ""} disabled />
                   <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="text-right">
                <Button onClick={handleSaveChanges} disabled={isPending || (name === currentUser.displayName)} className="font-semibold">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Personal Info
                </Button>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold font-headline mb-2">Change Password</h3>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
              <Button onClick={handleChangePassword} disabled={isPending || !currentPassword || !newPassword || !confirmNewPassword} size="lg" className="font-semibold">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
