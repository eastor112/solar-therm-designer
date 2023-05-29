import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';

const RootLayout = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className='flex bg-gray-200'>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Outlet context={{ isSidebarOpen: open }} />
        </Box>
      </div>
    </>
  );
};

export default RootLayout;

interface IOutletContext {
  isSidebarOpen: boolean;
}

export const useOutletContexRoot = () => {
  return useOutletContext<IOutletContext>();
};
