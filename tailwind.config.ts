import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Main theme colors based on cinematic vibe
                background: '#F6F6F4',
                'dark-background': '#1c1c1c',    // Dark Charcoal
                'background-secondary': '#bdc3c7', // Smoke Grey
                'dark-background-secondary': '#000000', // Deep Black
                text: '#bdc3c7',                // Smoke Grey
                'dark-text': '#1a1a1a',
                'text-secondary': '#7f8c8d',
                'dark-text-secondary': '#95a5a6',
                
                // Primary action colors
                primary: '#e74c3c',             // Crimson Red
                'dark-primary': '#c0392b',      // Darker Crimson
                secondary: '#f39c12',           // Golden Yellow
                'dark-secondary': '#d35400',    // Darker Golden
                accent: '#e67e22',              // Orange accent
                'dark-accent': '#d35400',

                // Status colors
                success: '#27ae60',
                'dark-success': '#2ecc71',
                warning: '#f39c12',
                'dark-warning': '#f1c40f',
                error: '#e74c3c',
                'dark-error': '#c0392b'
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'zoom-in': 'zoomIn 0.4s ease-out',
                'delay-200': 'none 200ms',
                'delay-300': 'none 300ms'
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' }
                },
                slideUp: {
                    'from': { transform: 'translateY(30px)', opacity: '0' },
                    'to': { transform: 'translateY(0)', opacity: '1' }
                },
                zoomIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                }
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;