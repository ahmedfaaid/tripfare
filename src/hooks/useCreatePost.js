import { apiUrl } from '@/utils/constants';
import { useState } from 'react';

export default function useCreatePost() {
  const [loading, setLoading] = useState(false);

  const createPost = async (data) => {
    setLoading(true);

    const { media, ...rest } = data;

    const formData = new FormData();
    media.forEach((file) => {
      formData.append('media', file);
    });
    formData.append('data', JSON.stringify(rest));

    const req = await fetch(`${apiUrl}/post`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });

    const res = await req.json();

    if (
      res.statusCode === 400 ||
      res.statusCode === 500 ||
      res.statusCode === 413
    ) {
      setLoading(false);

      return {
        ok: false,
        response:
          'An error occured while submitting your post. Please try in a few minutes.'
      };
    }

    setLoading(false);
    return {
      ok: true,
      response: res
    };
  };

  return { createPost, loading };
}
