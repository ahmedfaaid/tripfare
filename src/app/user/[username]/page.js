'use client';
import PostCard from '@/components/postCard';
import { AuthContext } from '@/context/auth';
import useGetUserPosts from '@/hooks/useGetUserPosts';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useState } from 'react';

export default function UserPage() {
  const { username } = useParams();
  const [type, setType] = useState('p');
  const { user } = useContext(AuthContext);
  const { loading, error, posts } = useGetUserPosts(username, type);

  return (
    <Box>
      <Box
        sx={{
          boxShadow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          py: 2,
          px: 16,
          borderRadius: 2,
          backgroundColor: 'cardWhite',
          color: 'soot.main'
        }}
      >
        <Button
          sx={{
            color: 'inherit'
          }}
          onClick={() => setType('p')}
        >
          My posts
        </Button>
        <Button
          sx={{
            color: 'inherit'
          }}
          onClick={() => setType('s')}
        >
          Saved posts
        </Button>
      </Box>
      {type === 'p' ? (
        <Box
          sx={{
            marginTop: 3
          }}
        >
          {loading ? (
            <Skeleton
              variant='rounded'
              sx={{
                width: '100%',
                height: 250
              }}
            />
          ) : error ? (
            <Typography>
              Oops something went wrong. Please reload the page
            </Typography>
          ) : posts?.length ? (
            posts?.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))
          ) : (
            <Typography sx={{ textAlign: 'center' }}>
              You have no posts to display. Click{' '}
              <Link href='/posts/create'>here</Link> to create a post!
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 3
          }}
        >
          {loading ? (
            <Skeleton
              variant='rounded'
              sx={{
                width: '100%',
                height: 250
              }}
            />
          ) : error ? (
            <Typography>
              Oops something went wrong. Please reload the page
            </Typography>
          ) : posts?.length ? (
            posts?.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))
          ) : (
            <Typography sx={{ textAlign: 'center' }}>
              You have no saved posts to display.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
