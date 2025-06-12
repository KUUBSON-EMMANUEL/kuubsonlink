import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, MessageSquare, Phone, Search } from "lucide-react";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order status on the 'Order Tracking' page, accessible from your account or through the link in your confirmation email. Once your order is out for delivery, you may also see live GPS tracking if available from the vendor.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept various payment methods including major credit/debit cards (Visa, MasterCard, American Express), and popular mobile wallets. Available options may vary by vendor.",
  },
  {
    question: "How can I change or cancel my order?",
    answer: "If you need to change or cancel your order, please contact the vendor directly as soon as possible. Contact information can be found on the vendor's page or your order confirmation. Cancellation policies may vary.",
  },
  {
    question: "What if I have an issue with my order?",
    answer: "If you encounter any issues with your order (e.g., incorrect items, quality concerns), please reach out to our customer support team via live chat, email, or phone. We're here to help resolve any problems.",
  },
];

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center">
        <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary">Customer Support</h1>
        <p className="text-lg text-muted-foreground mt-2">We&apos;re here to help! Find answers to common questions or get in touch with us.</p>
      </header>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="relative mb-6">
            <Input type="search" placeholder="Search FAQs..." className="pl-10 w-full max-w-lg mx-auto" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="bg-card shadow-sm rounded-md mb-2">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-foreground">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact Options Section */}
      <section>
        <h2 className="text-3xl font-headline font-semibold text-foreground mb-8 text-center">Still Need Help? Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-xl font-headline">Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Chat with a support agent now for immediate assistance.</p>
              <Button variant="outline">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="h-10 w-10 text-primary mx-auto mb-3" />
              <CardTitle className="text-xl font-headline">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-1">Reach us at: <a href="tel:+18001234567" className="font-semibold text-primary hover:underline">+1 (800) 123-4567</a></p>
              <p className="text-xs text-muted-foreground">Available Mon-Fri, 9am-6pm EST</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
               <CardTitle className="text-xl font-headline text-center">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactName">Your Name</Label>
                <Input id="contactName" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="contactEmail">Your Email</Label>
                <Input id="contactEmail" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="contactMessage">Message</Label>
                <Textarea id="contactMessage" placeholder="How can we help you?" rows={4} />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
