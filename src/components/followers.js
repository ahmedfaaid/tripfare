import { AuthContext } from '@/context/auth';
import { apiUrl } from '@/utils/constants';
import { Person } from '@mui/icons-material';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { useContext } from 'react';

export default function Followers() {
  const { user } = useContext(AuthContext);

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        mt: 3,
        pt: 2,
        backgroundColor: 'cardWhite'
      }}
    >
      <Typography
        textAlign='center'
        component='h5'
        fontWeight={600}
        color='soot'
      >
        {user?.followers.length} followers
      </Typography>
      <List>
        {user?.followers.length ? (
          user.followers.map((follower) => (
            <ListItem key={follower.id}>
              <ListItemButton href='#'>
                <ListItemAvatar>
                  {follower.user.profile_picture ? (
                    <Avatar
                      alt={`${follower.user.first_name} ${follower.user.last_name}`}
                      src={`${apiUrl}/${follower.user.profile_picture.path}`}
                    />
                  ) : (
                    <Avatar>
                      <Person fontSize='small' color='white' />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText color='soot'>
                  {follower.user.username}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography>You have no followers</Typography>
        )}
      </List>
    </Box>
  );
}
