import { Box, Typography } from '@mui/material';

export default function UserData() {
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        mt: 3,
        p: 2,
        backgroundColor: 'cardWhite'
      }}
    >
      <Typography>User data section</Typography>
    </Box>
  );
}
