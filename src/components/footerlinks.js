import { Box, Link } from '@mui/material';

const links = [
  'about',
  'careers',
  'privacy',
  'terms',
  'acceptable use',
  'business services',
  'press'
];

export default function FooterLinks() {
  return (
    <Box mt={3}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}
      >
        {links.map((link) => (
          <Link
            key={link}
            sx={{
              textTransform: 'capitalize',
              p: 1
            }}
            href='#'
            underline='hover'
            color='soot'
          >
            {link}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
