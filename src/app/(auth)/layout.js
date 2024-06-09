'use client';
import { AuthContext } from '@/context/auth';
import { Container } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function LoginDashboard({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (user) {
      router.replace(redirect ? `${redirect}` : '/');
    }
  }, [user, redirect, router]);

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
