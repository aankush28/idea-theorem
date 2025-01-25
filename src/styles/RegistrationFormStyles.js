// src/styles/useFormStyles.js
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export const useFormStyles = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    formHeader: {
      margin: '0 auto',
      padding: '45px',
      maxWidth: isMobile ? '100%' : '502px',
    },
    formBody: {
      maxWidth: isMobile ? '100%' : '502px',
      padding: isMobile ? '16px' : '40px',
      paddingBottom: '15px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Added boxShadow here
      borderRadius: '8px',  // Optional, you can round the corners if desired
    },
    typographyFontStyle: {
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '10px',
    },
  };
};
