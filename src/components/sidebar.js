import { Box } from '@mui/material';
import Followers from './Followers';
import Following from './following';
import Tags from './tags';

export default function Sidebar() {
  return (
    <Box component='aside'>
      <Tags />
      <Followers />
      <Following />
    </Box>
  );
}
