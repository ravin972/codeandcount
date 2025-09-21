
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
        // Dark mode hero: Blue primary to Violet accent, blending into dark background
        'gradient-main-hero': "linear-gradient(180deg, hsl(var(--background)) 20%, hsl(var(--primary)/0.15) 70%, hsl(var(--accent)/0.2) 100%)",
        // Light mode hero: Similar gradient but lighter
        'gradient-main-hero-light': "linear-gradient(180deg, hsl(var(--background)) 40%, hsl(var(--primary)/0.15) 75%, hsl(var(--accent)/0.15) 100%)",
        
        // CTA Bloom for dark mode (Blue and Violet focused)
        'gradient-bloom-cta': "radial-gradient(ellipse 70% 80% at 50% 120%, hsl(var(--primary)/0.4) 0%, hsl(var(--accent)/0.25) 40%, transparent 70%)",
        // CTA Bloom for light mode (Softer Blue and Violet)
        'gradient-bloom-cta-light': "radial-gradient(ellipse 70% 60% at 50% 100%, hsl(var(--primary)/0.25) 0%, hsl(var(--accent)/0.15) 40%, transparent 70%)",

        // General subtle background, blending secondary into background
        'gradient-subtle-bg': "linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)",
        'gradient-subtle-bg-light': "linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)",
        
        // Blob gradients using new primary (Blue) and accent (Violet)
        'gradient-blob-1': "radial-gradient(ellipse 40% 40% at 25% 75%, hsl(var(--primary) / 0.2) 0%, transparent 70%)", 
        'gradient-blob-1-light': "radial-gradient(ellipse 40% 40% at 25% 75%, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        'gradient-blob-2': "radial-gradient(ellipse 40% 40% at 75% 25%, hsl(var(--accent) / 0.2) 0%, transparent 70%)", 
        'gradient-blob-2-light': "radial-gradient(ellipse 40% 40% at 75% 25%, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
        
        'gradient-text-dynamic': "linear-gradient(60deg, hsl(var(--primary)) 30%, hsl(var(--accent)) 100%)", 
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
        // ShadCN UI Accordion
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
        // Preloader
        'preloader-fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0', visibility: 'hidden' },
        },
        'flip-in': {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        // Floating Diya
        'float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        // Diwali Cracker
        'cracker-burst': {
          '0%': { transform: 'scale(0.5)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'text-glow-and-fade': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
            textShadow: '0 0 5px hsla(var(--primary), 0.5)',
          },
          '20%': {
            opacity: '1',
            transform: 'scale(1.05)',
            textShadow: '0 0 20px hsla(var(--primary), 1), 0 0 30px hsla(var(--accent), 0.7)',
          },
          '80%': {
            opacity: '1',
            transform: 'scale(1)',
            textShadow: '0 0 20px hsla(var(--primary), 1), 0 0 30px hsla(var(--accent), 0.7)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.9)',
            textShadow: '0 0 5px hsla(var(--primary), 0.5)',
          },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'preloader-fade-out': 'preloader-fade-out 0.5s ease-in-out forwards',
        'flip-in': 'flip-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float': 'float 4s ease-in-out infinite',
        'cracker-burst': 'cracker-burst 1s ease-out forwards',
        'text-glow-and-fade': 'text-glow-and-fade 3s ease-in-out forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
