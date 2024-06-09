'use client';
import { apiUrl } from '@/utils/constants';
import { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
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
        setLoading(false);
        return {
          ok: true,
          response: res
        };
      },
      logout: async () => {
        setLoading(true);
        await fetch(`${apiUrl}/auth/logout`, {
          method: 'DELETE'
        });
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

        const formData = new FormData();
        if (profile_picture) {
          formData.append('profile_picture', profile_picture);
        }
        formData.append('data', JSON.stringify(rest));

        const req = await fetch(`${apiUrl}/auth/register`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        });
        const res = await req.json();

        if (res.statusCode === 400) {
          setUser(null);
          setLoading(false);
          return {
            ok: false,
            response: res.error
          };
        }

        if (res.statusCode === 500) {
          setUser(null);
          setLoading(false);
          return {
            ok: false,
            response: 'Oops something went wrong.'
          };
        }

        setUser(res);
        setLoading(false);
        return {
          ok: true,
          response: res
        };
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ loading, setLoading, user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
}
