// Refined Design System for DTBC
export const theme = {
  colors: {
    light: {
      // Primary palette - warm, earthy tones
      primary: {
        50: '#faf9f7',
        100: '#f5f2ed',
        200: '#e8e1d4',
        300: '#d9ccb8',
        400: '#c7b299',
        500: '#b5967a', // Main brand color - warm taupe
        600: '#9d7f63',
        700: '#7d6450',
        800: '#5f4d3e',
        900: '#433729'
      },
      
      // Secondary palette - soft sage
      secondary: {
        50: '#f7f9f7',
        100: '#eff3ef',
        200: '#dde5dd',
        300: '#c8d4c8',
        400: '#b0c0b0',
        500: '#96a896', // Soft sage green
        600: '#7d8f7d',
        700: '#647164',
        800: '#4d564d',
        900: '#383d38'
      },
      
      // Neutral palette - warm grays
      neutral: {
        50: '#fafaf9',
        100: '#f4f4f2',
        200: '#e6e6e3',
        300: '#d1d1cc',
        400: '#b8b8b0',
        500: '#9c9c91',
        600: '#7d7d72',
        700: '#5f5f56',
        800: '#44443d',
        900: '#2c2c27'
      },
      
      // Accent colors
      accent: {
        gold: '#d4af37',
        cream: '#f8f6f0',
        stone: '#8b8680'
      },
      
      // Semantic colors
      background: {
        primary: '#ffffff',
        secondary: '#fafaf9',
        tertiary: '#f4f4f2'
      },
      text: {
        primary: '#2c2c27',
        secondary: '#5f5f56',
        muted: '#9c9c91',
        inverse: '#ffffff'
      },
      border: '#e6e6e3',
      shadow: 'rgba(44, 44, 39, 0.1)'
    },
    
    dark: {
      // Primary palette - adjusted for dark mode
      primary: {
        50: '#433729',
        100: '#5f4d3e',
        200: '#7d6450',
        300: '#9d7f63',
        400: '#b5967a',
        500: '#c7b299', // Lighter in dark mode
        600: '#d9ccb8',
        700: '#e8e1d4',
        800: '#f5f2ed',
        900: '#faf9f7'
      },
      
      // Secondary palette - adjusted for dark mode
      secondary: {
        50: '#383d38',
        100: '#4d564d',
        200: '#647164',
        300: '#7d8f7d',
        400: '#96a896',
        500: '#b0c0b0',
        600: '#c8d4c8',
        700: '#dde5dd',
        800: '#eff3ef',
        900: '#f7f9f7'
      },
      
      // Neutral palette - dark mode
      neutral: {
        50: '#1a1a17',
        100: '#2c2c27',
        200: '#44443d',
        300: '#5f5f56',
        400: '#7d7d72',
        500: '#9c9c91',
        600: '#b8b8b0',
        700: '#d1d1cc',
        800: '#e6e6e3',
        900: '#fafaf9'
      },
      
      // Accent colors - adjusted for dark mode
      accent: {
        gold: '#f4d03f',
        cream: '#2c2c27',
        stone: '#a8a39e'
      },
      
      // Semantic colors - dark mode
      background: {
        primary: '#1a1a17',
        secondary: '#2c2c27',
        tertiary: '#44443d'
      },
      text: {
        primary: '#fafaf9',
        secondary: '#d1d1cc',
        muted: '#9c9c91',
        inverse: '#2c2c27'
      },
      border: '#44443d',
      shadow: 'rgba(0, 0, 0, 0.3)'
    },
    
    // Backward compatibility - maintain old structure for existing components
    // This allows gradual migration to the new theme system
    primary: {
      50: '#faf9f7',
      100: '#f5f2ed',
      200: '#e8e1d4',
      300: '#d9ccb8',
      400: '#c7b299',
      500: '#b5967a',
      600: '#9d7f63',
      700: '#7d6450',
      800: '#5f4d3e',
      900: '#433729'
    },
    
    secondary: {
      50: '#f7f9f7',
      100: '#eff3ef',
      200: '#dde5dd',
      300: '#c8d4c8',
      400: '#b0c0b0',
      500: '#96a896',
      600: '#7d8f7d',
      700: '#647164',
      800: '#4d564d',
      900: '#383d38'
    },
    
    neutral: {
      50: '#fafaf9',
      100: '#f4f4f2',
      200: '#e6e6e3',
      300: '#d1d1cc',
      400: '#b8b8b0',
      500: '#9c9c91',
      600: '#7d7d72',
      700: '#5f5f56',
      800: '#44443d',
      900: '#2c2c27'
    },
    
    accent: {
      gold: '#d4af37',
      cream: '#f8f6f0',
      stone: '#8b8680'
    },
    
    white: '#ffffff',
    black: '#1a1a17',
    text: {
      primary: '#2c2c27',
      secondary: '#5f5f56',
      muted: '#9c9c91'
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