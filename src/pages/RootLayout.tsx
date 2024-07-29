import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  ModalType,
  getModalSelector,
} from '../components/Modal/getModalSelector';
import { useUIStore } from '../store/uiStore';
import Loader from '../components/Loader/Loader';

const RootLayout = () => {
  const {
    modalComponent,
    openModal,
    setOpenModal,
    setModalComponent,
    isLoading,
  } = useUIStore();

  const [openSidebar, setOpenSidebar] = useState(true);
  const toggleDrawer = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleOpenGlobalModal = (value: ModalType) => {
    setOpenModal(true);
    setModalComponent(getModalSelector[value]);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <Sidebar
          open={openSidebar}
          toggleDrawer={toggleDrawer}
          handleOpenGlobalModal={handleOpenGlobalModal}
        />
        <Box sx={{ width: openSidebar ? '240px' : '72px' }}></Box>
        <Box component='main' sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
          <Outlet context={{ isSidebarOpen: openSidebar }} />
        </Box>
        {modalComponent && (
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            {modalComponent!! ? <Box>{modalComponent}</Box> : <Box />}
          </Modal>
        )}

        {isLoading && (
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <Loader />
          </Box>
        )}
      </Box>
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
