'use client';
import { AuthContext } from '@/context/auth';
import { Container } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function LoginDashboard({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (user) {
      router.replace(params.redirect ? `${params.redirect}` : '/');
    }
  }, [user, params.redirect, router]);

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
