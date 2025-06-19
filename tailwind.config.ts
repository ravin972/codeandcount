
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
        'gradient-main-hero': "linear-gradient(150deg, hsl(var(--primary)) 5%, hsl(var(--accent) / 0.8) 50%, hsl(var(--background)) 95%)",
        'gradient-main-hero-light': "linear-gradient(150deg, hsl(var(--primary)) 5%, hsl(var(--accent) / 0.7) 50%, hsl(var(--card)) 95%)",
        'gradient-subtle-bg': "linear-gradient(180deg, hsl(var(--secondary) / 0.7) 0%, hsl(var(--background)) 100%)",
        'gradient-subtle-bg-light': "linear-gradient(180deg, hsl(var(--secondary) / 0.5) 0%, hsl(var(--background)) 100%)",
        'gradient-blob-1': "radial-gradient(ellipse 50% 50% at 25% 25%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 40%, transparent 70%)",
        'gradient-blob-1-light': "radial-gradient(ellipse 50% 50% at 25% 25%, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)",
        'gradient-blob-2': "radial-gradient(ellipse 50% 50% at 75% 75%, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.3) 40%, transparent 70%)",
        'gradient-blob-2-light': "radial-gradient(ellipse 50% 50% at 75% 75%, hsl(var(--accent) / 0.7) 0%, hsl(var(--accent) / 0.1) 40%, transparent 70%)",
        'gradient-text-dynamic': "linear-gradient(70deg, hsl(var(--primary)) 20%, hsl(var(--accent)) 80%)",
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
