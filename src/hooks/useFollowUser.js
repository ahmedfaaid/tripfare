import { apiUrl } from '@/utils/constants';
import { useState } from 'react';

export default function useFollowUser() {
  const [loading, setLoading] = useState(false);

  const followUser = async (username) => {
    setLoading(true);

    const req = await fetch(`${apiUrl}/follow/${username}`, {
      method: 'POST'
    });
    const res = await req.json();

    if (res.statusCode === 400 || !res) {
      setLoading(false);
      return {
        ok: false,
        response: 'Something went wrong'
      };
    }

    setLoading(false);
    return {
      ok: true
    };
  };

  const unfollowUser = async (username) => {
    setLoading(true);

    const req = await fetch(`${apiUrl}/follow/${username}`, {
      method: 'DELETE'
    });
    const res = await req.json();

    if (res.statusCode === 400 || !res) {
      setLoading(false);
      return {
        ok: false,
        response: 'Something went wrong'
      };
    }

    setLoading(false);
    return {
      ok: true
    };
  };

  return { followUser, unfollowUser, loading };
}
