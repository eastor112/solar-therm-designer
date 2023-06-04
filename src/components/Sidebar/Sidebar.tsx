import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { mainListItems } from './MenuItems';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface DashboardContentProps {
  open: boolean;
  toggleDrawer: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  open,
  toggleDrawer,
}) => {
  return (
    <Drawer
      variant='permanent'
      open={open}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: 3,
        height: '100vh',
      }}
    >
      <Box sx={{}}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'yellow',
          }}
        >
          <Typography>Solartherm</Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <Box
          sx={{
            backgroundColor: 'red',
          }}
        >
          <Divider />
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Box>
      </Box>
      <Box sx={{ flex: 1, backgroundColor: 'yellow' }}></Box>

      <Box
        component={'p'}
        sx={{
          width: '100%',
          whiteSpace: 'normal',
          height: '100px',
          overflow: 'hidden',
          backgroundColor: 'blue',
          color: 'white',
        }}
      >
        Software de diseño de termas solares elaborado en la Escuela de
        Ingeniería Mecatrónica de la Universidad Nacional de Trujillo en
        colaboración con la Universidad Nacional de Piura, como parte del
        proyecto de “Diseño de termas solares con tubos al vacío”. El equipo de
        trabajo fue conformado por... ver mas
      </Box>
    </Drawer>
  );
};

export default DashboardContent;
