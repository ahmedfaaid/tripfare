import { AuthContext } from '@/context/auth';
import { Box } from '@mui/material';
import { useContext } from 'react';
import ContactAndHelp from './contactAndHelp';
import Followers from './followers';
import Following from './following';
import FooterLinks from './footerlinks';
import Tags from './tags';

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <Box component='aside'>
      <Tags />
      {user && <Followers />}
      {user && <Following />}
      <ContactAndHelp />
      <FooterLinks />
    </Box>
  );
}
