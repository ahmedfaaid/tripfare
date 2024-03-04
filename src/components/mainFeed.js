import postData from '@/post_data.json';
import { Box } from '@mui/material';
import PostCard from './postCard';

export default function MainFeed() {
  return (
    <Box mt={3}>
      {postData.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </Box>
  );
}
