import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import theme from '@/theme';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

export const metadata = {
  title: 'Trip Fare'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container sx={{ my: 5 }}>
              <Grid container columnSpacing={12}>
                <Grid item md={4}>
                  <Sidebar />
                </Grid>
                <Grid item md={8}>
                  <Box component='main'>{children}</Box>
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
