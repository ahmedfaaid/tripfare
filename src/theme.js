'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

const theme = createTheme({
  palette: {
    tripfare: {
      main: '#62558B'
    },
    soot: '#160D08',
    cardWhite: '#FFFDFC'
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
});

export default theme;
