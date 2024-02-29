import { AccountCircle, QuestionAnswer } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

export default function ContactAndHelp() {
  return (
    <Box sx={{ boxShadow: 1, borderRadius: 2, mt: 3, pt: 2 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton href='#'>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary='Contact' color='soot' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href='#'>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary='Help' color='soot' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
