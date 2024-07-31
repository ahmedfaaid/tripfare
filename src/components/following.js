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

export default function Following() {
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
        {user.following.length} following
      </Typography>
      <List>
        {user?.following.length ? (
          user.following.map((following) => (
            <ListItem key={following.id}>
              <ListItemButton href='#'>
                <ListItemAvatar>
                  {following.followed_user.profile_picture ? (
                    <Avatar
                      alt={`${following.followed_user.first_name} ${following.followed_user.last_name}`}
                      src={`${apiUrl}/${following.followed_user.profile_picture.path}`}
                    />
                  ) : (
                    <Avatar>
                      <Person fontSize='small' color='white' />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText color='soot'>
                  {following.followed_user.username}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography>You are not following anyone</Typography>
        )}
      </List>
    </Box>
  );
}
