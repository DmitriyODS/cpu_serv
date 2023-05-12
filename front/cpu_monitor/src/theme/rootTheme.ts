import { createTheme } from '@mui/material';

const rootTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#463e3d',
      default: '#312c2c',
    },
    primary: {
      main: '#d77146',
      light: '#e5855d',
      dark: '#c76138',
      contrastText: '#4f1f0d',
    },
  },
});

export default rootTheme;
