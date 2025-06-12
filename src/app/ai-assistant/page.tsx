import { MarketingCopyForm } from '@/components/forms/MarketingCopyForm';
import { ReviewResponseForm } from '@/components/forms/ReviewResponseForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot } from 'lucide-react';

export default function AiAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center">
        <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary">AI Message Assistant</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Leverage AI to craft engaging marketing content and thoughtful customer responses.
        </p>
      </header>

      <Tabs defaultValue="marketing-copy" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="marketing-copy">Marketing Copy</TabsTrigger>
          <TabsTrigger value="review-response">Review Response</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketing-copy" className="animate-in fade-in duration-300">
          <MarketingCopyForm />
        </TabsContent>
        
        <TabsContent value="review-response" className="animate-in fade-in duration-300">
          <ReviewResponseForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
