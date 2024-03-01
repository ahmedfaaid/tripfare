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

const following = [
  {
    id: 1,
    username: 'Ming_344',
    image: '/images/pexels-dziana-hasanbekava-7275385.jpg'
  },
  {
    id: 2,
    username: 'User_5852',
    image: '/images/pexels-italo-melo-2379004.jpg'
  },
  {
    id: 3,
    username: 'Joan_6446',
    image: '/images/pexels-cottonbro-studio-5850889.jpg'
  },
  {
    id: 4,
    username: 'Nori_3173',
    image: '/images/pexels-andrea-piacquadio-839011.jpg'
  }
];

export default function Following() {
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
        {following.length} following
      </Typography>
      <List>
        {following.map(follower => (
          <ListItem key={follower.id}>
            <ListItemButton href='#'>
              <ListItemAvatar>
                <Avatar alt={follower.username} src={follower.image} />
              </ListItemAvatar>
              <ListItemText color='soot'>{follower.username}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
