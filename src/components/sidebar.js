import { Box } from '@mui/material';
import ContactAndHelp from './contactAndHelp';
import Followers from './followers';
import Following from './following';
import FooterLinks from './footerlinks';
import Tags from './tags';

export default function Sidebar() {
  return (
    <Box component='aside'>
      <Tags />
      <Followers />
      <Following />
      <ContactAndHelp />
      <FooterLinks />
    </Box>
  );
}
