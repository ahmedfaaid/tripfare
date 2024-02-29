import { Box } from '@mui/material';
import Followers from './followers';
import Tags from './tags';

export default function Sidebar() {
  return (
    <Box component='aside'>
      <Tags />
      <Followers />
    </Box>
  );
}
