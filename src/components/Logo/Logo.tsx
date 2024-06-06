import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactComponent as LogoSD } from '../../assets/logo.svg';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'end',
        gap: 1.8,
      }}
    >
      <LogoSD width={40} height={80} />
      <Typography
        variant='h6'
        sx={{
          lineHeight: '1.5rem',
          paddingBottom: '10px',
        }}
      >
        Solartherm <br /> Designer
      </Typography>
    </Box>
  );
};

export default Logo;
