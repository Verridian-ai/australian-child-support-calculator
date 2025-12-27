/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Express Plus Child Support Color Palette
				accent: {
					orange: '#FF6B35', // Vibrant orange for operators
					green: '#10B981', // Government green
					teal: '#14B8A6', // Professional teal
					yellow: '#FBBF24', // Bright yellow accent
				},
				// Australian Child Support Calculator Color Palette
				primary: {
					50: '#E6F0FF',
					100: '#B3D4FF',
					300: '#4D9BFF',
					500: '#0066FF',
					700: '#0047B3',
				},
				dark: {
					900: '#0A0E14',
					850: '#10131A',
					800: '#151922',
					700: '#1E2530',
					600: '#2A3343',
					550: '#38404F',
					500: '#425066',
					400: '#4A5568',
					300: '#5A6578',
					200: '#8B95A8',
				},
				glass: {
					base: 'rgba(255, 255, 255, 0.03)',
					border: 'rgba(255, 255, 255, 0.08)',
					hover: 'rgba(255, 255, 255, 0.06)',
				},
				semantic: {
					success: '#10B981',
					warning: '#F59E0B',
					error: '#EF4444',
					info: '#3B82F6',
				},
				text: {
					primary: '#F8FAFC',
					secondary: '#CBD5E1',
					tertiary: '#94A3B8',
					muted: '#64748B',
				},
				// Legacy shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				display: ["'Inter'", '-apple-system', 'system-ui', 'sans-serif'],
				body: ["'Inter'", '-apple-system', 'system-ui', 'sans-serif'],
				mono: ["'JetBrains Mono'", "'Fira Code'", 'monospace'],
			},
			fontSize: {
				xs: '12px',
				sm: '14px',
				base: '16px',
				lg: '20px',
				xl: '24px',
				'2xl': '32px',
				'3xl': '40px',
				'4xl': '56px',
			},
			fontWeight: {
				regular: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
			},
			lineHeight: {
				tight: '1.25',
				normal: '1.5',
				relaxed: '1.6',
			},
			letterSpacing: {
				tight: '-0.02em',
				normal: '0',
				wide: '0.05em',
			},
			spacing: {
				1: '4px',
				2: '8px',
				3: '12px',
				4: '16px',
				5: '20px',
				6: '24px',
				8: '32px',
				10: '40px',
				12: '48px',
				14: '56px',
				16: '64px',
				18: '72px',
				20: '80px',
				22: '88px',
				24: '96px',
				28: '112px',
			},
			borderRadius: {
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
				full: '9999px',
			},
			boxShadow: {
				'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
				'glass-md': '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
				'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
				// Enhanced Neumorphic Shadows (Pressed/Depressed Design)
				'neumorphic-raised': '8px 8px 16px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.08)',
				'neumorphic-pressed': 'inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -2px -2px 8px rgba(255, 255, 255, 0.05)',
				'neumorphic-operator': '8px 8px 20px rgba(255, 107, 53, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.1)',
				'neumorphic-operator-pressed': 'inset 4px 4px 8px rgba(255, 107, 53, 0.3), inset -2px -2px 8px rgba(255, 255, 255, 0.1)',
				'neumorphic-accent': '8px 8px 20px rgba(20, 184, 166, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.1)',
				'modal': '0 20px 64px rgba(0, 0, 0, 0.6)',
				'tooltip': '0 4px 12px rgba(0, 0, 0, 0.5)',
			},
			backdropBlur: {
				sm: '12px',
				md: '20px',
				lg: '40px',
			},
			animation: {
				'fast': '150ms',
				'base': '250ms',
				'slow': '400ms',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			transitionDuration: {
				'fast': '150ms',
				'base': '250ms',
				'slow': '400ms',
			},
			transitionTimingFunction: {
				'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
				'accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}