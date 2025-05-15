
import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Facebook, Github } from 'lucide-react';

const socialLinks = [
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <Linkedin className="h-6 w-6" /> },
  { href: 'https://twitter.com', label: 'Twitter', icon: <Twitter className="h-6 w-6" /> },
  { href: 'https://instagram.com', label: 'Instagram', icon: <Instagram className="h-6 w-6" /> },
  { href: 'https://facebook.com', label: 'Facebook', icon: <Facebook className="h-6 w-6" /> },
  { href: 'https://github.com', label: 'GitHub', icon: <Github className="h-6 w-6" /> },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
              Apex<span className="text-foreground">Agency</span>
            </Link>
            <p className="mt-2 text-sm">
              Crafting digital experiences that inspire and convert.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services" className="text-sm hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/work" className="text-sm hover:text-primary transition-colors">Work</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
             <p className="mt-4 text-sm">
              123 Design St, Web City, 00000
            </p>
            <p className="text-sm">
              <a href="mailto:hello@apexagency.example" className="hover:text-primary transition-colors">hello@apexagency.example</a>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} Apex Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
