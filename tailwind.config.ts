import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Admin theme colors
        admin: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#0ea5e9',
          background: '#f8fafc',
          surface: '#ffffff',
          border: '#e2e8f0',
          text: '#1e293b',
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
