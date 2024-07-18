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

const RootLayout = () => {
  const { modalComponent, openModal, setOpenModal, setModalComponent } =
    useUIStore();

  const [openSidebar, setOpenSidebar] = useState(true);
  const toggleDrawer = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleOpenGlobalModal = (value: ModalType) => {
    setOpenModal(true);
    setModalComponent(getModalSelector[value]);
  };

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div className='flex'>
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
            <div>{modalComponent}</div>
          </Modal>
        )}
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
