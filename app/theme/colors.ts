// Custom Color Palette - Nature-inspired Earth Tones
// Base colors: #EBE1D1 (Cream), #41644A (Forest Green), #0D4715 (Deep Green), #E9762B (Warm Orange)
// Updated for better contrast and calmer dark mode

export const lightPalette = {
  primary: {
    main: '#41644A', // Forest Green
    light: '#5a8266',
    dark: '#2d4633',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#D97028', // Slightly muted orange
    light: '#E28D52',
    dark: '#B85920',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2d6738', // Medium green
    light: '#4a855b',
    dark: '#1a4522',
  },
  error: {
    main: '#C75A2C', // Muted red-orange
    light: '#D47851',
    dark: '#A04521',
  },
  warning: {
    main: '#D97028',
    light: '#E28D52',
    dark: '#B85920',
  },
  info: {
    main: '#5a8266',
    light: '#7a9d84',
    dark: '#41644A',
  },
  background: {
    default: '#F5F0E8', // Lighter, softer cream
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1a3321', // Softer dark green
    secondary: '#41644A',
  },
};

export const darkPalette = {
  primary: {
    main: '#6B9677', // Softer, desaturated green
    light: '#89AF97',
    dark: '#4F7359',
    contrastText: '#F5F0E8',
  },
  secondary: {
    main: '#C9965F', // Muted warm tone
    light: '#D8AD7F',
    dark: '#B07D4A',
    contrastText: '#F5F0E8',
  },
  success: {
    main: '#6B9677',
    light: '#89AF97',
    dark: '#4F7359',
  },
  error: {
    main: '#C97D5F', // Muted coral
    light: '#D8977F',
    dark: '#B0634A',
  },
  warning: {
    main: '#C9965F',
    light: '#D8AD7F',
    dark: '#B07D4A',
  },
  info: {
    main: '#7DA88B',
    light: '#99BDAA',
    dark: '#6B9677',
  },
  background: {
    default: '#1C2420', // Calm, warm dark grey-green
    paper: '#262E28', // Slightly lighter for cards
  },
  text: {
    primary: '#E8DFD0', // Warm off-white
    secondary: '#B8AE9E', // Muted beige
  },
};

export const tiringLevelColors = {
  light: {
    low: '#2d6738',        // Medium Green
    'low-medium': '#41644A',
    medium: '#5a8266',     // Forest Green
    'medium-high': '#C9965F',
    high: '#D97028',       // Warm Orange
    'very-high': '#C75A2C', // Strong Orange-Red
  },
  dark: {
    low: '#6B9677',        // Soft Green
    'low-medium': '#7DA88B',
    medium: '#89AF97',     // Light Forest Green
    'medium-high': '#B8A575',
    high: '#C9965F',       // Muted Orange
    'very-high': '#C97D5F', // Muted Coral
  },
};
