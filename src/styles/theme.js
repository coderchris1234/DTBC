// Refined Design System for DTBC - Warm Blue Aesthetic
export const theme = {
  colors: {
    light: {
      // Primary palette - warm, sophisticated blues
      primary: {
        50: '#f0f4f8',
        100: '#d9e2ec',
        200: '#bcccdc',
        300: '#9fb3c8',
        400: '#829ab1',
        500: '#627d98', // Main brand color - warm steel blue
        600: '#486581',
        700: '#334e68',
        800: '#243b53',
        900: '#102a43'
      },
      
      // Secondary palette - soft teal blues
      secondary: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6', // Soft teal
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a'
      },
      
      // Neutral palette - warm blue-grays
      neutral: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a'
      },
      
      // Accent colors - complementary warm tones
      accent: {
        gold: '#f59e0b',
        cream: '#fef7ed',
        stone: '#78716c'
      },
      
      // Semantic colors - light mode
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9'
      },
      text: {
        primary: '#0f172a',
        secondary: '#334155',
        muted: '#64748b',
        inverse: '#ffffff'
      },
      border: '#e2e8f0',
      shadow: 'rgba(15, 23, 42, 0.1)'
    },
    
    dark: {
      // Primary palette - adjusted for dark mode
      primary: {
        50: '#102a43',
        100: '#243b53',
        200: '#334e68',
        300: '#486581',
        400: '#627d98',
        500: '#829ab1', // Lighter in dark mode
        600: '#9fb3c8',
        700: '#bcccdc',
        800: '#d9e2ec',
        900: '#f0f4f8'
      },
      
      // Secondary palette - adjusted for dark mode
      secondary: {
        50: '#134e4a',
        100: '#115e59',
        200: '#0f766e',
        300: '#0d9488',
        400: '#14b8a6',
        500: '#2dd4bf',
        600: '#5eead4',
        700: '#99f6e4',
        800: '#ccfbf1',
        900: '#f0fdfa'
      },
      
      // Neutral palette - dark mode
      neutral: {
        50: '#0f172a',
        100: '#1e293b',
        200: '#334155',
        300: '#475569',
        400: '#64748b',
        500: '#94a3b8',
        600: '#cbd5e1',
        700: '#e2e8f0',
        800: '#f1f5f9',
        900: '#f8fafc'
      },
      
      // Accent colors - adjusted for dark mode
      accent: {
        gold: '#fbbf24',
        cream: '#1e293b',
        stone: '#a8a29e'
      },
      
      // Semantic colors - dark mode
      background: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155'
      },
      text: {
        primary: '#f8fafc',
        secondary: '#e2e8f0',
        muted: '#94a3b8',
        inverse: '#0f172a'
      },
      border: '#334155',
      shadow: 'rgba(0, 0, 0, 0.3)'
    },
    
    // Backward compatibility - maintain old structure for existing components
    // This allows gradual migration to the new theme system
    primary: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#627d98',
      600: '#486581',
      700: '#334e68',
      800: '#243b53',
      900: '#102a43'
    },
    
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a'
    },
    
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    
    accent: {
      gold: '#f59e0b',
      cream: '#fef7ed',
      stone: '#78716c'
    },
    
    white: '#ffffff',
    black: '#0f172a',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b'
    }
  },
  
  typography: {
    fonts: {
      primary: '"Crimson Text", "Times New Roman", serif', // Elegant serif for headings
      secondary: '"Inter", "Helvetica Neue", sans-serif', // Clean sans-serif for body
      accent: '"Playfair Display", serif' // Decorative serif for special elements
    },
    
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem'   // 72px
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2
    }
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
    '5xl': '12rem'
  },
  
  shadows: {
    subtle: '0 1px 3px rgba(44, 44, 39, 0.05)',
    soft: '0 4px 6px rgba(44, 44, 39, 0.07)',
    medium: '0 10px 15px rgba(44, 44, 39, 0.1)',
    large: '0 25px 50px rgba(44, 44, 39, 0.15)'
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  }
}