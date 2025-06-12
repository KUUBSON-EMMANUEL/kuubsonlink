"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateMarketingCopy, type GenerateMarketingCopyOutput } from "@/ai/flows/generate-marketing-copy";
import { Loader2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const marketingCopySchema = z.object({
  productName: z.string().min(2, "Product name is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  targetAudience: z.string().min(3, "Target audience is required."),
  tone: z.string().min(3, "Tone is required."),
  keywords: z.string().optional(),
  callToAction: z.string().min(3, "Call to action is required."),
});

type MarketingCopyFormValues = z.infer<typeof marketingCopySchema>;

export function MarketingCopyForm() {
  const [isPending, startTransition] = useTransition();
  const [generatedCopy, setGeneratedCopy] = useState<GenerateMarketingCopyOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<MarketingCopyFormValues>({
    resolver: zodResolver(marketingCopySchema),
    defaultValues: {
      productName: "",
      description: "",
      targetAudience: "",
      tone: "",
      keywords: "",
      callToAction: "",
    },
  });

  function onSubmit(values: MarketingCopyFormValues) {
    startTransition(async () => {
      setGeneratedCopy(null);
      try {
        const result = await generateMarketingCopy(values);
        setGeneratedCopy(result);
      } catch (error) {
        console.error("Failed to generate marketing copy:", error);
        toast({
          title: "Error",
          description: "Failed to generate marketing copy. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  const handleCopyToClipboard = () => {
    if (generatedCopy?.marketingCopy) {
      navigator.clipboard.writeText(generatedCopy.marketingCopy)
        .then(() => {
          toast({
            title: "Copied!",
            description: "Marketing copy has been copied to clipboard.",
          });
        })
        .catch(err => {
          console.error("Failed to copy:", err);
          toast({
            title: "Error",
            description: "Failed to copy text.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Marketing Copy Generator</CardTitle>
        <CardDescription>Describe your product or promotion, and let AI craft compelling marketing text.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product/Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sizzling Summer BBQ Platter" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detail its benefits and unique selling points." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Families, Young Professionals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Tone</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Humorous, Professional, Enthusiastic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., fresh, local, spicy, limited-time" {...field} />
                  </FormControl>
                  <FormDescription>Comma-separated keywords for SEO.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="callToAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Order Now!, Visit Us Today!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Copy
            </Button>
          </form>
        </Form>
      </CardContent>
      {generatedCopy && (
        <CardFooter className="flex-col items-start gap-4 mt-6 border-t pt-6">
            <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold font-headline">Generated Marketing Copy:</h3>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} disabled={!generatedCopy?.marketingCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <div className="w-full p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">
                {generatedCopy.marketingCopy}
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
