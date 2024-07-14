import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Link } from '@mui/material';
import { MainListItems, SecondaryListItems } from './MenuItems';
import Logo from '../Logo/Logo';
import RecentFilesList from '../RecentFilesList/RecentFilesList';
import { Link as LinkRouter } from 'react-router-dom';
import { ModalType } from '../Modal/getModalSelector';

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

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
  handleOpenGlobalModal: (value: ModalType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  toggleDrawer,
  handleOpenGlobalModal,
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
          <Link
            to='/dashboard/designer'
            component={LinkRouter}
            sx={{
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 2,
              }}
            >
              <Logo />
            </Box>
          </Link>

          <Box
            sx={{
              width: '100%',
            }}
          >
            <Divider />
            <List component='nav'>
              <MainListItems handleOpenGlobalModal={handleOpenGlobalModal} />
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems
                handleOpenGlobalModal={handleOpenGlobalModal}
              />
              <Divider sx={{ my: 1 }} />
            </List>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          {open && (
            <RecentFilesList handleOpenGlobalModal={handleOpenGlobalModal} />
          )}
        </Box>
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

export default Sidebar;
