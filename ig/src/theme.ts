import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f4f6fb',
      paper: '#fff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        },
      },
    },
  },
});

export default theme; 