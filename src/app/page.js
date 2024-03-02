'use client';
import FeedFilter from '@/components/feedFilter';
import MainFeed from '@/components/mainFeed';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <FeedFilter />
      <MainFeed />
    </Box>
  );
}
