import { apiUrl } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';

export default function useGetUserPosts(username, type) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const [error, setError] = useState(null);
  const cache = useRef({});

  const url = `${apiUrl}/post?username=${username}&type=${type}`;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      if (cache.current[url]) {
        const data = cache.current[url];
        setError(null);
        setPosts(data);
        setLoading(false);
        return;
      } else {
        const req = await fetch(url);
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
      }
    };

    fetchPosts();
  }, [url]);

  return { loading, error, posts };
}
