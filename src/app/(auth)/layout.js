import { Container } from '@mui/material';

export default function LoginDashboard({ children }) {
  return (
    <Container
      component='section'
      maxWidth='sm'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '80%'
      }}
    >
      {children}
    </Container>
  );
}
