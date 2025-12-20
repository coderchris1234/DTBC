import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../styles/theme';

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();
  
  return {
    colors: isDarkMode ? theme.colors.dark : theme.colors.light,
    isDarkMode,
    // Helper function to get CSS custom property
    getCSSVar: (property) => `var(--${property})`,
    // Helper function to get theme-aware color
    getColor: (colorPath) => {
      const colors = isDarkMode ? theme.colors.dark : theme.colors.light;
      return colorPath.split('.').reduce((obj, key) => obj?.[key], colors);
    }
  };
};