
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    id: "faq-1",
    question: "What services does CodeAndCount.com offer?",
    answer: "We provide a comprehensive suite of digital services including custom brand identity design, high-performance website and mobile app development, strategic SEO optimization, specialized Craft CMS and WordPress development, and professional accounting services."
  },
  {
    id: "faq-2",
    question: "How long does a typical project take to complete?",
    answer: "Project timelines can vary significantly based on the scope, complexity, and specific requirements of your project. After an initial consultation and project assessment, we provide a detailed project plan with clear milestones and estimated completion dates."
  },
  {
    id: "faq-3",
    question: "What is your pricing model?",
    answer: "Our pricing is tailored to the unique needs of each project. We offer flexible models including fixed project-based fees and ongoing retainers for continuous support. We encourage you to contact us for a custom quote based on your specific requirements."
  },
  {
    id: "faq-4",
    question: "Do you offer support and maintenance after a project is launched?",
    answer: "Absolutely. We believe in building long-term partnerships. We offer various ongoing support and maintenance packages to ensure your website or application remains secure, up-to-date, and performs optimally post-launch."
  },
  {
    id: "faq-5",
    question: "Can you help improve my website's search engine ranking?",
    answer: "Yes, SEO is one of our core services. We employ data-driven strategies, including keyword research, on-page optimization, technical SEO, and content strategy, to help improve your website's visibility and ranking on search engines like Google."
  },
  {
    id: "faq-6",
    question: "What industries do you typically work with?",
    answer: "We have experience working with a diverse range of industries, from tech startups and e-commerce businesses to professional services and non-profit organizations. Our adaptable approach allows us to tailor solutions for various market sectors."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <HelpCircle className="h-12 w-12 mr-4 text-primary" />
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our services, processes, and how we can help your business succeed.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map(item => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-lg text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
