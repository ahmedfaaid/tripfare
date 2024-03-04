import { slugify } from '@/utils/fns';
import {
  BookmarkBorderOutlined,
  MessageOutlined,
  MoreVert,
  Payments,
  ShareOutlined
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

export default function PostCard({ post, index }) {
  return (
    <Card
      sx={{
        boxShadow: 1,
        ...(index !== 0 && { marginTop: 5 })
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={post.postedBy.profilePicture} aria-label='User Avatar' />
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={
          <Box>
            <Typography component='p' sx={{ fontSize: 14, color: 'soot' }}>
              <Link
                href='/profile'
                sx={{
                  fontWeight: 500,
                  color: 'soot'
                }}
                underline='hover'
              >
                {post.postedBy.username}
              </Link>{' '}
              spent{' '}
              <Typography component='span' sx={{ fontWeight: 500 }}>
                {post.lengthOfStay}
              </Typography>{' '}
              in{' '}
              <Link
                href={`/tags/${post.location}`}
                sx={{ fontWeight: 500, color: 'soot' }}
                underline='hover'
              >
                {post.location}
              </Link>
            </Typography>
          </Box>
        }
        subheader={
          <Box>
            <Link
              underline='hover'
              href={`/posts/${slugify(post.title)}`}
              sx={{
                fontWeight: 500,
                marginTop: 1,
                color: 'soot',
                fontSize: 14
              }}
            >
              {post.title}
            </Link>
          </Box>
        }
      />
      <Box sx={{ marginLeft: 9, display: 'flex', marginBottom: 1 }}>
        <Payments sx={{ color: 'olive' }} />
        <Typography sx={{ marginLeft: 2 }}>
          <Typography component='span' sx={{ fontWeight: 500 }}>
            Total Budget:
          </Typography>{' '}
          {post.budget}
        </Typography>
      </Box>
      <Box sx={{ marginLeft: 9, display: 'flex', marginBottom: 1 }}>
        <Typography sx={{ fontSize: 12, color: grey[600] }}>
          {post.text.substring(0, 100)}...
        </Typography>
      </Box>
      <CardActionArea href={`/posts/${slugify(post.title)}`}>
        <CardMedia component='img' src={post.image} />
      </CardActionArea>
      <CardActions sx={{ color: grey[600] }}>
        <Button
          startIcon={<MessageOutlined />}
          color='inherit'
          sx={{ fontSize: 12 }}
          href={`/posts/${slugify(post.title)}/#comments`}
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
  );
}
