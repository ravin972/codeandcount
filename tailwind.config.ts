
import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
      backgroundImage: {
        // Dark mode hero: Green primary to Gold accent, blending into dark background
        'gradient-main-hero': "linear-gradient(180deg, hsl(var(--background)) 20%, hsl(var(--primary)/0.1) 70%, hsl(var(--accent)/0.15) 100%)",
        // Light mode hero: Similar gradient but lighter
        'gradient-main-hero-light': "linear-gradient(180deg, hsl(var(--background)) 60%, hsl(var(--primary)/0.05) 90%, hsl(var(--accent)/0.08) 100%)",
        
        // CTA Bloom for dark mode (Green and Gold focused)
        'gradient-bloom-cta': "radial-gradient(ellipse 70% 80% at 50% 120%, hsl(var(--primary)/0.5) 0%, hsl(var(--accent)/0.3) 40%, transparent 70%)",
        // CTA Bloom for light mode (Softer Green and Gold)
        'gradient-bloom-cta-light': "radial-gradient(ellipse 80% 70% at 50% 110%, hsl(var(--primary)/0.25) 0%, hsl(var(--accent)/0.15) 35%, transparent 65%)",

        // General subtle background, blending secondary into background
        'gradient-subtle-bg': "linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)",
        'gradient-subtle-bg-light': "linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)",
        
        // Blob gradients using new primary (Green) and accent (Gold)
        'gradient-blob-1': "radial-gradient(ellipse 40% 40% at 25% 75%, hsl(var(--primary) / 0.15) 0%, transparent 70%)", // Green blob
        'gradient-blob-1-light': "radial-gradient(ellipse 40% 40% at 25% 75%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        'gradient-blob-2': "radial-gradient(ellipse 40% 40% at 75% 25%, hsl(var(--accent) / 0.15) 0%, transparent 70%)", // Gold blob
        'gradient-blob-2-light': "radial-gradient(ellipse 40% 40% at 75% 25%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
        
        'gradient-text-dynamic': "linear-gradient(60deg, hsl(var(--primary)) 30%, hsl(var(--accent)) 100%)", // Green to Gold text
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
