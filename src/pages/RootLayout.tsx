import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalAbout from '../components/Modal/ModalAbout';
import ModalFile from '../components/Modal/ModalFile';
import ModalNewProject from '../components/Modal/ModalNewProject';
import ModalOpenProject from '../components/Modal/ModalOpenProject';
import ModalReports from '../components/Modal/ModalReports';

const modalSelector: { [key: string]: JSX.Element } = {
  about: <ModalAbout />,
  file: <ModalFile />,
  new: <ModalNewProject />,
  open: <ModalOpenProject />,
  reports: <ModalReports />,
};

const RootLayout = () => {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [modalComponent, setmodalComponent] = useState<any>();

  const handleOpenGlobalModal = (value: string) => {
    setOpenModal(true);
    setmodalComponent(modalSelector[value]);
  };

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
        {modalComponent && (
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            {modalComponent}
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
