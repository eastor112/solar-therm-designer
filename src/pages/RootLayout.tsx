import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RootLayout = () => {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenGlobalModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div className='flex bg-gray-400'>
        <Sidebar
          open={open}
          toggleDrawer={toggleDrawer}
          handleOpenGlobalModal={handleOpenGlobalModal}
        />
        <Box sx={{ width: open ? '240px' : '72px' }}></Box>
        <Box component='main' sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
          <Outlet context={{ isSidebarOpen: open }} />
        </Box>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Global Modal
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Hacer algo
            </Typography>
          </Box>
        </Modal>
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
