import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import logo from '../../../assets/logo.svg';
import './Header.css'; // Import the CSS file

const Header = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Check if screen size is mobile or smaller

  return (
    <Box
      component="div"
      className={`header ${isMobile ? 'header-mobile' : 'header-desktop'}`}
    >
      <img
        src={logo}
        alt="logo"
        className={`logo ${isMobile ? 'logo-mobile' : ''}`}
      />
    </Box>
  );
};

export default Header;
