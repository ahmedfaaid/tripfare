import { apiUrl } from '@/utils/constants';
import { useEffect, useState } from 'react';

export default function useSinglePost(slug) {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      const req = await fetch(`${apiUrl}/post/${slug}`);
      const res = await req.json();

      if (res.statusCode === 400) {
        setError(res);
        setPost(null);
        setLoading(false);
        return;
      }

      setError(null);
      setPost(res);
      setLoading(false);
      return;
    };

    fetchPost();
  }, [slug]);

  return { loading, error, post };
}
