import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { MainListItems, SecondaryListItems } from './MenuItems';
import Logo from '../Logo/Logo';
import RecentFilesList from '../../pages/RecentFilesList/RecentFilesList';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    overflow: 'hidden',
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
    <>
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
          border: 'none',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 2,
            }}
          >
            <Logo />
          </Box>

          <Box
            sx={{
              width: '100%',
            }}
          >
            <Divider />
            <List component='nav'>
              <MainListItems />
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems />
              <Divider sx={{ my: 1 }} />
            </List>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>{open && <RecentFilesList />}</Box>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 4,
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Drawer>
    </>
  );
};

export default DashboardContent;
