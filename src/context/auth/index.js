'use client';
import { decrypt, encrypt } from '@/lib/functions';
import userData from '@/user_data.json';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['tripfare_qid']);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const me = async () => {
      setLoading(true);
      if (!cookies.tripfare_qid) {
        setUser(null);
        router.push('/login');
        return;
      }

      const session = await decrypt(cookies.tripfare_qid);

      const {
        user: { id, email, username },
        expires
      } = session;
      const searchedUser = await userData.find((u) => u.id === id);

      if (
        !searchedUser ||
        searchedUser.id !== id ||
        searchedUser.email !== email ||
        searchedUser.username !== username ||
        new Date().getTime() > new Date(expires).getTime()
      ) {
        setUser(null);
        setLoading(false);
        router.push('/login');
        return;
      }

      setUser(user);
      setLoading(false);
    };

    me();
  }, [user, cookies, router]);

  const authContext = useMemo(
    () => ({
      login: async (data) => {
        setLoading(true);

        const { email, password } = data;

        const user = await userData.find((user) => user.email === email);

        if (!user) {
          setLoading(false);
          setUser(null);
          return {
            ok: false,
            response: {
              status: 401,
              message: 'Invalid Credentials'
            }
          };
        }
        if (password !== user.password) {
          setLoading(false);
          setUser(null);
          return {
            ok: false,
            response: {
              status: 401,
              message: 'Invalid Credentials'
            }
          };
        }

        const dataStore = {
          id: user.id,
          email: user.email,
          username: user.username
        };
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        const session = await encrypt({ user: dataStore, expires });
        await setCookie('tripfare_qid', session, {
          httpOnly: true,
          expires
        });
        setUser(user);
        setLoading(false);

        return {
          ok: true,
          response: {
            status: 200,
            message: 'Login Successful'
          }
        };
      },
      logout: async () => {
        await removeCookie('tripfare_qid', {
          expires: new Date(0)
        });
        setUser(null);
      }
    }),
    [setCookie, removeCookie]
  );

  return (
    <AuthContext.Provider value={{ loading, setLoading, user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
}
