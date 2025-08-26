// Nederland Stemt - Premium Design System
// Inspired by Dutch government and premium democratic platforms

export const designSystem = {
  // Premium Color Palette - Dutch Heritage + Modern
  colors: {
    primary: {
      50: '#f0f4ff',   // Lightest blue
      100: '#dbeafe',  // Light blue
      200: '#bfdbfe',  // Medium light blue
      500: '#3b82f6',  // Main blue (Netherlands heritage)
      600: '#2563eb',  // Darker blue
      700: '#1d4ed8',  // Dark blue
      900: '#1e3a8a',  // Darkest blue
    },
    orange: {
      50: '#fff7ed',   // Lightest orange
      100: '#ffedd5',  // Light orange
      200: '#fed7aa',  // Medium light orange
      500: '#f97316',  // Main orange (Dutch flag)
      600: '#ea580c',  // Darker orange
      700: '#c2410c',  // Dark orange
    },
    neutral: {
      50: '#f9fafb',   // Almost white
      100: '#f3f4f6',  // Light gray
      200: '#e5e7eb',  // Medium light gray
      300: '#d1d5db',  // Medium gray
      400: '#9ca3af',  // Gray
      500: '#6b7280',  // Dark gray
      600: '#4b5563',  // Darker gray
      700: '#374151',  // Very dark gray
      800: '#1f2937',  // Almost black
      900: '#111827',  // Black
    },
    success: '#10b981',  // Green
    warning: '#f59e0b',  // Yellow
    error: '#ef4444',    // Red
  },
  
  // Typography Scale - Professional & Accessible
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, -apple-system, sans-serif',
      heading: 'Poppins, Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing & Layout
  spacing: {
    section: '4rem',     // 64px
    container: '2rem',   // 32px
    card: '1.5rem',      // 24px
    element: '1rem',     // 16px
  },
  
  // Component Styles
  components: {
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
      accent: 'bg-orange-500 hover:bg-orange-600 text-white',
    },
    card: {
      primary: 'bg-white border border-gray-200 shadow-sm',
      elevated: 'bg-white border border-gray-200 shadow-lg',
      accent: 'bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-200',
    },
  },
};

// Accessibility Guidelines
export const accessibility = {
  minContrastRatio: 4.5, // WCAG AA standard
  focusRing: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
};