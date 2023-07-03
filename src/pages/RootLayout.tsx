import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalAbout from '../components/Modal/ModalAbout';
import ModalFile from '../components/Modal/ModalFile';
import ModalNewProject from '../components/Modal/ModalNewProject';
import ModalOpenProject from '../components/Modal/ModalOpenProject';
import ModalReports from '../components/Modal/ModalReport';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setOpenModal } from '../redux/UISlice';
import ModalSaveChanges from '../components/Modal/ModalSaveChanges';
import {
  setCurrentLocation,
  setCurrentProject,
  setManifoldLength,
  setPipeNumber,
  setPipeType,
  setVolumen,
  setDate,
  areThereChanges,
} from '../redux/locationsSlice';
import ModalCloseProject from '../components/Modal/ModalCloseProject';

const modalSelector: { [key: string]: JSX.Element } = {
  about: <ModalAbout />,
  file: <ModalFile />,
  new: <ModalNewProject />,
  open: <ModalOpenProject />,
  report: <ModalReports />,
  save: <ModalSaveChanges />,
  close: <ModalCloseProject />,
};

const RootLayout = () => {
  const { openModal } = useAppSelector(state => state.ui);
  const {
    currentProject,
    currentLocation,
    date,
    volumen,
    manifoldLength,
    pipeNumber,
    pipeType,
    thereAreChanges,
  } = useAppSelector(state => state.locations);
  const dispatch = useAppDispatch();
  console.log(thereAreChanges);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [modalComponent, setmodalComponent] = useState<any>();

  const handleOpenGlobalModal = (value: string) => {
    dispatch(setOpenModal(true));
    setmodalComponent(modalSelector[value]);
  };

  const handleClose = () => dispatch(setOpenModal(false));

  useEffect(() => {
    const savedProject = localStorage.getItem('currentProject');

    if (currentProject === null && savedProject) {
      dispatch(setCurrentProject(JSON.parse(savedProject)));
      dispatch(
        setCurrentLocation(JSON.parse(localStorage.getItem('location')!))
      );
      dispatch(setDate(localStorage.getItem('date')!));
      dispatch(setVolumen(+localStorage.getItem('volumen')!));
      dispatch(setManifoldLength(+localStorage.getItem('manifoldLength')!));
      dispatch(setPipeNumber(+localStorage.getItem('pipeNumber')!));
      dispatch(setPipeType(+localStorage.getItem('pipeType')!));
    }
  }, []);

  useEffect(() => {
    dispatch(areThereChanges());
  }, [currentLocation, date, volumen, manifoldLength, pipeNumber, pipeType]);

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
            <>{modalComponent}</>
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
