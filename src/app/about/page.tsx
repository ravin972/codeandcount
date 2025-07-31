
import Image from 'next/image';
import { Award, Users, Zap, Target, Info, Milestone, Lightbulb, Handshake, Eye } from 'lucide-react';

const values = [
  { title: 'Innovation', icon: <Zap className="h-8 w-8 text-primary" />, description: 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions.' },
  { title: 'Collaboration', icon: <Handshake className="h-8 w-8 text-primary" />, description: 'We believe in strong partnerships, working closely with our clients to achieve shared goals.' },
  { title: 'Excellence', icon: <Award className="h-8 w-8 text-primary" />, description: 'We are committed to the highest standards of quality in every aspect of our work.' },
  { title: 'Vision', icon: <Eye className="h-8 w-8 text-primary" />, description: 'We look beyond the present, crafting solutions that are future-proof and scalable.' },
  { title: 'Client-Centric', icon: <Target className="h-8 w-8 text-primary" />, description: 'Our clients success is our success. We tailor our solutions to meet their unique needs and objectives.' },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-20 md:py-28 text-center bg-secondary border-b border-border relative overflow-hidden">
         <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-1"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Info className="h-12 w-12 mr-4 text-primary" />
            Shaping Tomorrow's Web
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We are a digital-native agency merging creativity, technology, and strategy to build the future of online experiences.
          </p>
        </div>
      </header>
      
      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Our Mission */}
              <div className="lg:col-span-2 bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <Milestone className="h-8 w-8 mr-3 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  To empower businesses of all sizes to thrive in the digital age. We craft bespoke web and AI solutions that are not just visually stunning, but also strategically sound, user-centric, and built to drive measurable results. We believe in the power of technology to solve problems and create opportunities.
                </p>
              </div>

              {/* Our Story Image */}
              <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden group">
                 <Image 
                  src="https://images.unsplash.com/photo-1680783954745-3249be59e527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxBaXxlbnwwfHx8fDE3NTM5NTk5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="A diverse team collaborating in a modern, creative workspace" 
                  width={800} 
                  height={1000} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint="creative team collaboration"
                />
              </div>

              {/* Our Vision */}
              <div className="lg:col-span-3 bg-secondary rounded-xl shadow-xl p-8 md:p-12 border border-border text-center">
                 <div className="flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 mr-3 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
                </div>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  We envision a web that is more intelligent, accessible, and beautiful. We strive to be at the forefront of this evolution, pushing the boundaries of what's possible and helping our clients navigate the future of digital interaction with confidence and creativity.
                </p>
              </div>
           </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 scrollbar-hide space-x-8">
              {values.map((value, index) => (
                 <div key={index} className="flex-shrink-0 w-80">
                   <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out h-full p-8 border border-border text-center flex flex-col items-center group hover:-translate-y-2" data-interactive-cursor="true">
                      <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-6 transition-transform duration-300 group-hover:scale-110">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground flex-grow">{value.description}</p>
                   </div>
                 </div>
              ))}
              {/* Add a duplicate for seamless loop illusion if using JS-based infinite scroll */}
               {values.map((value, index) => (
                 <div key={`-clone-${index}`} className="flex-shrink-0 w-80" aria-hidden="true">
                   <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out h-full p-8 border border-border text-center flex flex-col items-center group hover:-translate-y-2" data-interactive-cursor="true">
                      <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-6 transition-transform duration-300 group-hover:scale-110">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground flex-grow">{value.description}</p>
                   </div>
                 </div>
              ))}
            </div>
             <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
             <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
