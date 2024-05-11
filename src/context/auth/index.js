'use client';
import { apiUrl } from '@/utils/constants';
import { useParams, useRouter } from 'next/navigation';
import { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const me = async () => {
      setLoading(true);

      const req = await fetch(`${apiUrl}/auth/me`, {
        credentials: 'include'
      });
      const res = await req.json();

      if (res.statusCode === 401) {
        setUser(null);
        return;
      }

      setUser(res);
      setLoading(false);
    };

    me();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async (data) => {
        setLoading(true);

        const req = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });
        const res = await req.json();

        if (res.statusCode === 401) {
          setUser(null);
          setLoading(false);
          return {
            ok: false,
            response:
              'Invalid credentials. Please check your email and/or password'
          };
        }

        setUser(res);
        router.push(params.redirect ? `${params.redirect}` : '/');
        setLoading(false);
        return {
          ok: true,
          response: res
        };
      },
      logout: async () => {
        setLoading(true);
        await fetch(`${apiUrl}/auth/logout`);
        setUser(null);
        setLoading(false);
      },
      register: async (data) => {
        setLoading(true);

        const { confirm_password, profile_picture, ...rest } = data;

        if (confirm_password !== rest.password) {
          setUser(null);
          setLoading(false);
          return {
            ok: false,
            response: 'Passwords do not match'
          };
        }

        const req = await fetch(`${apiUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          credentials: 'include',
          body: JSON.stringify({ data: { ...rest }, profile_picture })
        });
        const res = await req.json();

        if (res.statusCode === 400) {
          setUser(null);
          setLoading(false);
          return {
            ok: false,
            response: 'There was an error. Please try again.'
          };
        }

        setUser(res);
        router.push(params.redirect ? `${params.redirect}` : '/');
        setLoading(false);
        return {
          ok: true,
          response: res
        };
      }
    }),
    [router, params]
  );

  return (
    <AuthContext.Provider value={{ loading, setLoading, user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
}
