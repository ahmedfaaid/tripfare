import { AuthContext } from '@/context/auth';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import ContactAndHelp from './contactAndHelp';
import Followers from './followers';
import Following from './following';
import FooterLinks from './footerlinks';
import Tags from './tags';
import UserData from './userData';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <Box component='aside'>
      {pathname === `/user/${user?.username}` ? <UserData /> : <Tags />}
      {user && <Followers />}
      {user && <Following />}
      <ContactAndHelp />
      <FooterLinks />
    </Box>
  );
}
