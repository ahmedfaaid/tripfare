import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

export default function FeedFilter() {
  const [locationEl, setLocationEl] = useState(null);
  const [costEl, setCostEl] = useState(null);
  const [stayLengthEl, setStayLengthEl] = useState(null);
  const locationOpen = Boolean(locationEl);
  const costOpen = Boolean(costEl);
  const stayLengthOpen = Boolean(stayLengthEl);

  const openLocation = event => {
    setLocationEl(event.currentTarget);
  };

  const openCost = event => {
    setCostEl(event.currentTarget);
  };

  const openStayLength = event => {
    setStayLengthEl(event.currentTarget);
  };

  const handleClose = () => {
    setLocationEl(null);
    setCostEl(null);
    setStayLengthEl(null);
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        py: 2,
        px: 5,
        borderRadius: 2,
        backgroundColor: 'cardWhite',
        color: 'soot'
      }}
    >
      <Button
        color='inherit'
        id='location-button'
        aria-controls={locationOpen ? 'location-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={locationOpen ? 'true' : undefined}
        onClick={openLocation}
      >
        Location
      </Button>
      <Menu
        id='location-menu'
        anchorEl={locationEl}
        open={locationOpen}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'location-button' }}
      >
        <MenuItem>North America</MenuItem>
        <MenuItem>South America</MenuItem>
        <MenuItem>Europe</MenuItem>
        <MenuItem>Africa</MenuItem>
        <MenuItem>Asia</MenuItem>
        <MenuItem>Australia</MenuItem>
        <MenuItem>Antarctica</MenuItem>
      </Menu>
      <Button
        color='inherit'
        id='cost-button'
        aria-controls={costOpen ? 'cost-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={costOpen ? 'true' : undefined}
        onClick={openCost}
      >
        Cost
      </Button>
      <Menu
        id='cost-menu'
        anchorEl={costEl}
        open={costOpen}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'cost-button' }}
      >
        <MenuItem>{'< $499'}</MenuItem>
        <MenuItem>$500 - $999</MenuItem>
        <Divider />
        <MenuItem>$1000 - $2999</MenuItem>
        <MenuItem>$3000 - $4999</MenuItem>
        <MenuItem>$5000+</MenuItem>
      </Menu>
      <Button
        color='inherit'
        id='stayLength-button'
        aria-controls={stayLengthOpen ? 'stayLength-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={stayLengthOpen ? 'true' : undefined}
        onClick={openStayLength}
      >
        Length of Stay
      </Button>
      <Menu
        id='stayLength-menu'
        anchorEl={stayLengthEl}
        open={stayLengthOpen}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'stayLength-button' }}
      >
        <MenuItem>{'< 1 week'}</MenuItem>
        <MenuItem>8 - 14 days</MenuItem>
        <Divider />
        <MenuItem>15 - 31 days</MenuItem>
        <MenuItem>1 month+</MenuItem>
      </Menu>
    </Box>
  );
}
