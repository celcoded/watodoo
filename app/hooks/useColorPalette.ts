import { useTheme } from '@mui/material';
import { tiringLevelColors } from '../theme/colors';

export const useColorPalette = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getTiringLevelColor = (level: string) => {
    const colorMap = isDarkMode ? tiringLevelColors.dark : tiringLevelColors.light;
    return colorMap[level as keyof typeof colorMap] || '#41644A';
  };

  return { getTiringLevelColor, isDarkMode };
};
