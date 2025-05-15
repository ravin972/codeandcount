
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Palette, Laptop, Search, Puzzle, ShoppingCart } from "lucide-react";

const servicesDetails = [
  { 
    name: 'Brand Identity', 
    description: 'We craft compelling brand narratives and visual identities that capture attention and build lasting connections. From logo design to comprehensive brand guidelines, we define your unique voice.',
    icon: <Palette className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Logo Design & Systems",
      "Brand Strategy & Positioning",
      "Visual Identity Guidelines",
      "Marketing Collateral Design"
    ]
  },
  { 
    name: 'Websites & Mobile Apps', 
    description: 'Our team designs and develops bespoke websites and mobile applications that are not only visually stunning but also highly functional, user-friendly, and optimized for performance across all devices.',
    icon: <Laptop className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "UI/UX Design & Prototyping",
      "Custom Web Development",
      "Mobile App Development (iOS & Android)",
      "Responsive Design & Accessibility"
    ]
  },
  { 
    name: 'SEO & Digital Marketing', 
    description: 'Boost your online visibility and reach your target audience effectively with our data-driven SEO and digital marketing strategies. We help you climb search rankings and maximize ROI.',
    icon: <Search className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Keyword Research & Analysis",
      "On-Page & Off-Page SEO",
      "Content Marketing Strategy",
      "PPC Campaign Management"
    ]
  },
  { 
    name: 'Craft CMS Development', 
    description: 'Leverage the power and flexibility of Craft CMS. We specialize in creating custom Craft CMS websites that offer unparalleled content management capabilities and scalability for your business.',
    icon: <Puzzle className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Custom Craft CMS Builds",
      "Plugin Development & Integration",
      "Craft Commerce Solutions",
      "Performance Optimization"
    ]
  },
  { 
    name: 'Shopify E-commerce', 
    description: 'Launch and grow your online store with our expert Shopify development services. We design and build captivating e-commerce experiences that drive sales and enhance customer engagement.',
    icon: <ShoppingCart className="h-12 w-12 mb-4 text-primary" />,
    points: [
      "Shopify Theme Customization",
      "Custom Shopify App Development",
      "Store Setup & Migration",
      "Conversion Rate Optimization"
    ]
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Our Expertise</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Delivering innovative solutions to power your digital success. We combine strategy, design, and technology to create exceptional outcomes.
          </p>
        </div>
      </header>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {servicesDetails.map((service) => (
              <Card key={service.name} className="bg-card text-card-foreground shadow-xl flex flex-col md:flex-row overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-secondary/30 md:border-r border-border">
                  {service.icon}
                  <CardTitle className="text-2xl font-semibold text-center">{service.name}</CardTitle>
                </div>
                <div className="md:w-2/3 p-6">
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.points.map((point, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
