
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, Users, Laptop, CheckCircle } from "lucide-react";

export default function ProcessesPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Workflow className="h-12 w-12 mr-4 text-primary" />
            Our Streamlined Processes
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We follow well-defined processes to ensure quality, efficiency, and successful outcomes for every project.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Account Management Process Section */}
          <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center mb-4">
                <Users className="h-10 w-10 mr-3 text-primary" />
                <CardTitle className="text-3xl md:text-4xl font-bold">Account Management Process</CardTitle>
              </div>
              <p className="text-lg text-muted-foreground">
                Our client-centric approach ensures seamless collaboration and transparent communication throughout your journey with us.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-4 text-muted-foreground">
                {[
                  { title: "Discovery & Onboarding", description: "We start by thoroughly understanding your business, goals, and requirements. A dedicated account manager will guide you through the onboarding process." },
                  { title: "Strategic Planning", description: "Collaboratively, we define project scope, timelines, and key performance indicators (KPIs) to align with your objectives." },
                  { title: "Regular Communication", description: "Expect consistent updates, scheduled check-ins, and prompt responses. We believe in proactive communication to keep you informed every step of the way." },
                  { title: "Performance Reporting", description: "We provide clear, insightful reports on project progress and outcomes, ensuring transparency and accountability." },
                  { title: "Feedback & Iteration", description: "Your feedback is invaluable. We incorporate iterative reviews and adjustments to ensure the final product meets your expectations." },
                  { title: "Long-Term Partnership", description: "Our goal is to become a trusted extension of your team, offering ongoing support and strategic advice for sustainable growth." },
                ].map(item => (
                  <li key={item.title} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>

          {/* Website & WordPress Development Process Section */}
          <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center mb-4">
                <Laptop className="h-10 w-10 mr-3 text-primary" />
                <CardTitle className="text-3xl md:text-4xl font-bold">Website & WordPress Development Process</CardTitle>
              </div>
              <p className="text-lg text-muted-foreground">
                Our development lifecycle is designed for quality, efficiency, and creating impactful digital experiences, whether it's a custom build or a WordPress solution.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-4 text-muted-foreground">
                {[
                  { title: "Requirement Analysis & Planning", description: "Detailed discussions to gather requirements, define user stories, sitemap, and technology stack (including WordPress considerations if applicable)." },
                  { title: "UI/UX Design & Prototyping", description: "Crafting intuitive user interfaces and engaging user experiences. We create wireframes and interactive prototypes for your review and feedback." },
                  { title: "Development & Coding", description: "Our skilled developers bring the designs to life using clean, efficient code and best practices, whether custom or WordPress-based." },
                  { title: "Content Integration", description: "Seamlessly integrating your content, or assisting with content creation, ensuring it's optimized for the web and user engagement." },
                  { title: "Testing & Quality Assurance", description: "Rigorous testing across devices and browsers to ensure functionality, performance, security, and a bug-free experience." },
                  { title: "Deployment & Launch", description: "A carefully planned launch process to ensure a smooth transition to the live environment, with minimal downtime." },
                  { title: "Post-Launch Support & Optimization", description: "We offer ongoing support, training, and performance monitoring to ensure your website continues to thrive." },
                ].map(item => (
                  <li key={item.title} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>
        </div>
      </section>
    </div>
  );
}
