import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Deep Navy (trust, enterprise, finance)
        navy: {
          50: '#e6e9f0',
          100: '#ccd4e1',
          200: '#99a9c3',
          300: '#667ea5',
          400: '#335387',
          500: '#002869', // Primary brand navy
          600: '#002054',
          700: '#00183f',
          800: '#00102a',
          900: '#000815',
        },
        // Secondary: Graphite (stability, seriousness)
        graphite: {
          50: '#f5f5f6',
          100: '#ebebed',
          200: '#d7d7db',
          300: '#c3c3c9',
          400: '#afafb7',
          500: '#2d3748', // Primary graphite
          600: '#24303f',
          700: '#1b2430',
          800: '#121820',
          900: '#090c10',
        },
        // Accent: Intelligent Teal (AI, innovation)
        teal: {
          50: '#e6f7f7',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#00afaf', // Primary teal accent
          600: '#008c8c',
          700: '#006969',
          800: '#004646',
          900: '#002323',
        },
        // Support: Neutral backgrounds
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Hero headlines
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        // Section titles
        'section': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'section-mobile': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Subsection titles
        'subsection': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        'section': '6rem',
        'section-mobile': '3rem',
      },
      maxWidth: {
        'content': '1200px',
        'text': '800px',
      },
      boxShadow: {
        'enterprise': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'enterprise-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
