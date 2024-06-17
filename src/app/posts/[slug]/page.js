'use client';
import postData from '@/post_data.json';
import { slugify } from '@/utils/fns';
import {
  BookmarkBorderOutlined,
  Commute,
  Hotel,
  Landscape,
  MessageOutlined,
  MoreVert,
  Payments,
  Person,
  Restaurant,
  ShareOutlined
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';

// TODO: Make image a carousel
// TODO: Include booking details for different events/locations

export default function SinglePost({ params }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      const post = await postData.find((p) => p.slug === params.slug);

      setPost(post);
    };

    fetchPost();
  }, [params.slug]);

  return (
    <Box mt={3}>
      <Card
        sx={{
          boxShadow: 1,
          backgroundColor: 'cardWhite'
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={post?.postedBy.profilePicture}
              aria-label='User Avatar'
            />
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          title={
            <Box>
              <Typography
                component='p'
                sx={{ fontSize: 14, color: 'soot.main' }}
              >
                <Link
                  href='/profile'
                  sx={{
                    fontWeight: 500,
                    color: 'soot.main'
                  }}
                  underline='hover'
                >
                  {post?.postedBy.username}
                </Link>{' '}
                spent{' '}
                <Typography component='span' sx={{ fontWeight: 500 }}>
                  {post?.lengthOfStay}
                </Typography>{' '}
                in{' '}
                <Link
                  href={`/tags/${post?.location}`}
                  sx={{ fontWeight: 500, color: 'soot.main' }}
                  underline='hover'
                >
                  {post?.location}
                </Link>
              </Typography>
            </Box>
          }
          subheader={
            <Box>
              <Typography
                href={`/posts/${slugify(post?.title)}`}
                sx={{
                  fontWeight: 500,
                  marginTop: 1,
                  color: 'soot.main',
                  fontSize: 14
                }}
              >
                {post?.title}
              </Typography>
            </Box>
          }
        />
        <Box sx={{ marginLeft: 9, display: 'flex', marginBottom: 1 }}>
          <Payments sx={{ color: 'olive' }} />
          <Typography sx={{ marginLeft: 2 }}>
            <Typography component='span' sx={{ fontWeight: 500 }}>
              Total Budget:
            </Typography>{' '}
            {post?.budget}
          </Typography>
        </Box>
        <Stack
          sx={{
            color: grey[600],
            fontSize: 8,
            marginLeft: 9,
            marginBottom: 1
          }}
          direction='row'
        >
          <Box
            sx={{
              display: 'flex',
              fontSize: 'inherit',
              marginRight: 3
            }}
          >
            <Restaurant
              sx={{
                marginRight: 1
              }}
            />
            <Typography>$300</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              fontSize: 'inherit',
              marginRight: 3
            }}
          >
            <Commute
              sx={{
                marginRight: 1
              }}
            />
            <Typography>$250</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              fontSize: 'inherit',
              marginRight: 3
            }}
          >
            <Hotel
              sx={{
                marginRight: 1
              }}
            />
            <Typography>$250</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              fontSize: 'inherit',
              marginRight: 3
            }}
          >
            <Landscape
              sx={{
                marginRight: 1
              }}
            />
            <Typography>$174</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              fontSize: 'inherit'
            }}
          >
            <Person
              sx={{
                marginRight: 1
              }}
            />
            <Typography>Solo Trip</Typography>
          </Box>
        </Stack>
        <CardMedia component='img' src={post?.image} />
        <CardContent
          sx={{
            marginTop: 3
          }}
        >
          <Typography>{post?.text}</Typography>
        </CardContent>
        <CardActions
          sx={{
            color: grey[600]
          }}
        >
          <Button
            startIcon={<MessageOutlined />}
            color='inherit'
            sx={{ fontSize: 12 }}
          >
            12 Comments
          </Button>
          <Button
            startIcon={<BookmarkBorderOutlined />}
            color='inherit'
            sx={{ fontSize: 12 }}
          >
            Save
          </Button>
          <Button
            startIcon={<ShareOutlined />}
            color='inherit'
            sx={{ fontSize: 12 }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
