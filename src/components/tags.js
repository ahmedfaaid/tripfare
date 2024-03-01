import { Box, Link, List, ListItem } from '@mui/material';

const tags = [
  'Popular Posts',
  'Trending Posts',
  'Solo Travel',
  'Couple Travel',
  'Group Travel',
  'Popular Destinations',
  'Trending Destinations'
];

export default function Tags() {
  return (
    <Box sx={{ boxShadow: 1, borderRadius: 2, backgroundColor: 'cardWhite' }}>
      <List>
        {tags.map(tag => (
          <ListItem key={tag}>
            <Link href='#' underline='hover' color='soot'>
              {tag}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
