/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-section': "url('/assets/HeroSection.jpg')",
        'hero-gradient': 'linear-gradient(to bottom, #000000, #166534 50%, #000000)',
        'hero-texture': "url('/assets/noise-texture.jpg')",
      },
      screens: {
        xsMobile: {
          max: '20em',
        },
        miniMobile: {
          min: '20.063em',
          max: '25.75em',
        },
        mobile: {
          min: '25.813em',
          max: '25.999em',
        },
        miniTablet: {
          min: '26em',
          max: '31.25em',
        },
        tablet: {
          min: '31.313em',
          max: '37.5em',
        },
        miniLaptop: {
          min: '37.563em',
          max: '42em',
        },
        laptop: {
          min: '42.063em',
          max: '56.25em',
        },
        desktop: {
          min: '56.313em',
          max: '75em',
        },
        largeDesktop: {
          min: '75.063em',
        },
      },
      fontFamily: {
        logoFonts: 'Rubik Maps, system-ui;',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
