
import Image from 'next/image';
import { Award, Users, Zap, Target, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  { name: 'Alex Chen', role: 'Lead Designer & Strategist', avatarSrc: 'https://placehold.co/120x120.png?text=AC', dataAiHint: 'professional person', bio: 'With over a decade of experience, Alex leads our creative vision, ensuring every project is both beautiful and impactful.' },
  { name: 'Maria Rodriguez', role: 'Head of Development', avatarSrc: 'https://placehold.co/120x120.png?text=MR', dataAiHint: 'software developer', bio: 'Maria is a tech wizard, transforming complex ideas into seamless digital experiences with her expert coding skills.' },
  { name: 'Sam Lee', role: 'SEO & Marketing Guru', avatarSrc: 'https://placehold.co/120x120.png?text=SL', dataAiHint: 'marketing expert', bio: 'Sam drives growth for our clients through innovative SEO and marketing strategies that deliver measurable results.' },
];

const values = [
  { title: 'Innovation', icon: <Zap className="h-8 w-8 text-primary" />, description: 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions.' },
  { title: 'Collaboration', icon: <Users className="h-8 w-8 text-primary" />, description: 'We believe in strong partnerships, working closely with our clients to achieve shared goals.' },
  { title: 'Excellence', icon: <Award className="h-8 w-8 text-primary" />, description: 'We are committed to the highest standards of quality in every aspect of our work.' },
  { title: 'Client-Centric', icon: <Target className="h-8 w-8 text-primary" />, description: 'Our clients success is our success. We tailor our solutions to meet their unique needs and objectives.' },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <Info className="h-12 w-12 mr-4 text-primary" />
            About CodeAndCount.com
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            We are a passionate team of designers, developers, and strategists dedicated to crafting exceptional digital experiences that drive results.
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Founded with a vision to merge creativity with technology, CodeAndCount.com has grown into a leading digital firm. We believe that great design and smart strategy are key to unlocking business potential. Our journey is one of continuous learning, innovation, and a relentless pursuit of excellence.
              </p>
              <p className="text-lg text-muted-foreground">
                We partner with businesses of all sizes, from ambitious startups to established enterprises, helping them navigate the digital landscape and achieve their goals. Our personal approach ensures we understand your unique challenges and aspirations, delivering tailored solutions that make a real impact.
              </p>
            </div>
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="CodeAndCount.com Team Working" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
                data-ai-hint="team collaboration office"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 hover:-translate-y-1">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary transform transition-transform duration-300 ease-in-out hover:scale-110">
                  <AvatarImage src={member.avatarSrc} alt={member.name} data-ai-hint={member.dataAiHint} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
