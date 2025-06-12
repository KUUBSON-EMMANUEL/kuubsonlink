"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateResponseToReview, type GenerateResponseToReviewOutput } from "@/ai/flows/generate-response-to-review";
import { Loader2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reviewResponseSchema = z.object({
  reviewText: z.string().min(10, "Review text must be at least 10 characters."),
  vendorName: z.string().min(2, "Your (vendor) name is required."),
  customerName: z.string().min(2, "Customer name is required."),
  existingResponse: z.string().optional(),
});

type ReviewResponseFormValues = z.infer<typeof reviewResponseSchema>;

export function ReviewResponseForm() {
  const [isPending, startTransition] = useTransition();
  const [generatedResponse, setGeneratedResponse] = useState<GenerateResponseToReviewOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ReviewResponseFormValues>({
    resolver: zodResolver(reviewResponseSchema),
    defaultValues: {
      reviewText: "",
      vendorName: "",
      customerName: "",
      existingResponse: "",
    },
  });

  function onSubmit(values: ReviewResponseFormValues) {
    startTransition(async () => {
      setGeneratedResponse(null);
      try {
        const result = await generateResponseToReview(values);
        setGeneratedResponse(result);
      } catch (error) {
        console.error("Failed to generate response:", error);
        toast({
          title: "Error",
          description: "Failed to generate response. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  const handleCopyToClipboard = () => {
    if (generatedResponse?.response) {
      navigator.clipboard.writeText(generatedResponse.response)
        .then(() => {
          toast({
            title: "Copied!",
            description: "Response has been copied to clipboard.",
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
        <CardTitle className="text-2xl font-headline">AI Review Responder</CardTitle>
        <CardDescription>Paste a customer review and let AI help you draft a professional response.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Review Text</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Paste the customer's review here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Restaurant/Vendor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Gourmet Kitchen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="existingResponse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Existing Response (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="If you've already drafted a response, paste it here for AI to improve." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Response
            </Button>
          </form>
        </Form>
      </CardContent>
      {generatedResponse && (
         <CardFooter className="flex-col items-start gap-4 mt-6 border-t pt-6">
            <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold font-headline">Generated Response:</h3>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} disabled={!generatedResponse?.response}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <div className="w-full p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">
                {generatedResponse.response}
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
