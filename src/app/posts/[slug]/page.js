'use client';
import useSinglePost from '@/hooks/useSinglePost';
import { apiUrl } from '@/utils/constants';
import {
  BookmarkBorderOutlined,
  Commute,
  Group,
  Groups,
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
import DOMPurify from 'dompurify';

// TODO: Make image a carousel
// TODO: Include booking details for different events/locations

export default function SinglePost({ params }) {
  const { error, post } = useSinglePost(params.slug);

  return (
    <Box mt={3}>
      {error ? (
        <Box>
          <Typography>There was an error loading the post.</Typography>
        </Box>
      ) : (
        <Card
          sx={{
            boxShadow: 1,
            backgroundColor: 'cardWhite'
          }}
        >
          <CardHeader
            avatar={
              post?.posted_by.profile_picture ? (
                <Avatar
                  src={`${apiUrl}/${post.posted_by.profile_picture.path}`}
                  aria-label='User Avatar'
                />
              ) : (
                <Avatar sx={{ bgcolor: grey[50], width: 50, height: 50 }}>
                  <Person fontSize='small' color='tripfare' />
                </Avatar>
              )
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
                    {post?.posted_by.username}
                  </Link>{' '}
                  spent{' '}
                  <Typography component='span' sx={{ fontWeight: 500 }}>
                    {post?.length_of_stay_num} {post?.length_of_stay_period}
                  </Typography>{' '}
                  in{' '}
                  <Link
                    href={`/tags/${post?.city}`}
                    sx={{ fontWeight: 500, color: 'soot.main' }}
                    underline='hover'
                  >
                    {post?.city}
                  </Link>
                  <Link
                    href={`/tags/${post?.country}`}
                    sx={{ fontWeight: 500, color: 'soot.main' }}
                    underline='hover'
                  >
                    {post?.country}
                  </Link>
                </Typography>
              </Box>
            }
            subheader={
              <Box>
                <Typography
                  href={`/posts/${post?.slug}`}
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
          <Box sx={{ marginLeft: 9, display: 'flex', marginBottom: 2 }}>
            <Payments sx={{ color: 'olive' }} />
            <Typography sx={{ marginLeft: 2 }}>
              <Typography component='span' sx={{ fontWeight: 500 }}>
                Total Budget:
              </Typography>{' '}
              {post?.total_budget}
            </Typography>
          </Box>
          <Stack
            sx={{
              color: grey[600],
              fontSize: 8,
              marginLeft: 9,
              marginBottom: 2
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
              <Typography>${post?.budget.food_drinks}</Typography>
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
              <Typography>${post?.budget.transportation}</Typography>
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
              <Typography>${post?.budget.accommodation}</Typography>
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
              <Typography>${post?.budget.activities}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                fontSize: 'inherit'
              }}
            >
              {post?.size_of_group === 1 ? (
                <Person
                  sx={{
                    marginRight: 1
                  }}
                />
              ) : post?.size_of_group === 2 ? (
                <Group
                  sx={{
                    marginRight: 1
                  }}
                />
              ) : (
                <Groups
                  sx={{
                    marginRight: 1
                  }}
                />
              )}
              <Typography>
                {post?.size_of_group === 1 ? 'Solo' : 'Group'} Trip
              </Typography>
            </Box>
          </Stack>
          <CardMedia component='img' src={`${apiUrl}/${post?.media[0].path}`} />
          <CardContent
            sx={{
              marginTop: 3
            }}
          >
            <Box
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.details)
              }}
            />
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
      )}
    </Box>
  );
}
