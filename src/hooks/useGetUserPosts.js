import { apiUrl } from '@/utils/constants';
import { useEffect, useState } from 'react';

export default function useGetUserPosts(username, type) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const req = await fetch(
        `${apiUrl}/post?username=${username}&type=${type}`
      );
      const res = await req.json();

      if (res.statusCode === 400 || res.statusCode === 404) {
        setError(res);
        setPosts(null);
        setLoading(false);
        return;
      }

      setError(null);
      setPosts(res);
      setLoading(false);
      return;
    };

    fetchPosts();
  }, [username, type]);

  return { loading, error, posts };
}
