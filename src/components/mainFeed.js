import postData from '@/post_data.json';
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
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

export default function MainFeed() {
  return (
    <Box mt={3}>
      {postData.map((post, index) => (
        <Card
          key={post.id}
          sx={{
            boxShadow: 1,
            ...(index !== 0 && { marginTop: 5 })
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={post.postedBy.profilePicture}
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
                <Typography component='p' sx={{ fontSize: 14, color: 'soot' }}>
                  <Typography
                    component='span'
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    {post.postedBy.username}
                  </Typography>{' '}
                  spent{' '}
                  <Typography component='span' sx={{ fontWeight: 500 }}>
                    {post.lengthOfStay}
                  </Typography>{' '}
                  in{' '}
                  <Typography component='span' sx={{ fontWeight: 500 }}>
                    {post.location}
                  </Typography>
                </Typography>
              </Box>
            }
            subheader={
              <Box>
                <Typography
                  component='p'
                  sx={{
                    fontWeight: 500,
                    marginTop: 1,
                    color: 'soot',
                    fontSize: 14
                  }}
                >
                  {post.title}
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
              {post.budget}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: 9, display: 'flex', marginBottom: 1 }}>
            <Typography sx={{ fontSize: 12, color: grey[600] }}>
              {post.text.substring(0, 100)}
            </Typography>
          </Box>
          <CardMedia component='img' src={post.image} />
          <CardActions sx={{ color: grey[600] }}>
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
      ))}
    </Box>
  );
}
