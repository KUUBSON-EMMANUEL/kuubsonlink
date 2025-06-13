
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Added useRouter

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const vendorRegistrationSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name must be at least 2 characters."),
  contactName: z.string().min(2, "Contact name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  address: z.string().min(5, "Address is too short."),
  cuisineType: z.string().min(2, "Cuisine type is required."),
  description: z.string().optional(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type VendorRegistrationFormValues = z.infer<typeof vendorRegistrationSchema>;

export function VendorRegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter(); // Initialized useRouter

  const form = useForm<VendorRegistrationFormValues>({
    resolver: zodResolver(vendorRegistrationSchema),
    defaultValues: {
      restaurantName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      cuisineType: "",
      description: "",
      agreedToTerms: false,
    },
  });

  function onSubmit(values: VendorRegistrationFormValues) {
    startTransition(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      console.log("Vendor Registration Submitted:", values);
      
      toast({
        title: "Registration Info Received!",
        description: "Thank you! We'll review your application. Please log in or create an account to eventually access your dashboard.",
        duration: 5000, // Keep toast a bit longer
      });
      form.reset(); // Reset form fields after successful submission
      router.push('/auth/login'); // Redirect to login page
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Become a Vendor Partner</CardTitle>
        <CardDescription>Fill out the form below to start selling on KuubsonLink.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="restaurantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Delicious Place" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Full Name (Contact Person)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                        <Input type="tel" placeholder="(123) 456-7890" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuisineType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Cuisine</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Italian, Mexican, Indian" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description of Your Restaurant (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about your restaurant's specialty or atmosphere."
                      className="resize-none"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreedToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-secondary/30">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the KuubsonLink <a href="/terms" className="text-primary hover:underline">terms and conditions</a>.
                    </FormLabel>
                    <FormDescription>
                      Please review our terms before proceeding.
                    </FormDescription>
                     <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-semibold" size="lg" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Submitting..." : "Register Restaurant"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

