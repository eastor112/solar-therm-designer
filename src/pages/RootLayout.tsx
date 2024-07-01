import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setModalComponent, setOpenModal } from '../redux/UISlice';
import { getProject } from '../redux/locationsSlice';
import {
  ModalType,
  destructiveModals,
  getModalSelector,
} from '../components/Modal/getModalSelector';
import { areThereChanges, setNextModalAction } from '../redux/locationsSlice';
import { useUIStore } from '../store/uiStore';

const RootLayout = () => {
  const {
    currentProject,
    currentLocation,
    date,
    volumen,
    manifoldLength,
    pipeNumber,
    pipeType,
    thereAreChanges,
    wantsToSave,
  } = useAppSelector(state => state.locations);

  const { modalComponent, openModal } = useUIStore();

  const dispatch = useAppDispatch();
  const [openSidebar, setOpenSidebar] = useState(true);
  const toggleDrawer = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleOpenGlobalModal = (value: ModalType) => {
    dispatch(setOpenModal(true));
    if (destructiveModals.includes(value) && thereAreChanges && wantsToSave) {
      dispatch(setNextModalAction(value));
      dispatch(setModalComponent(getModalSelector['discard']));
      return;
    }
    dispatch(setModalComponent(getModalSelector[value]));
  };

  const handleClose = () => dispatch(setOpenModal(false));

  // useEffect(() => {
  //   const unloadListener = (e: any) => {
  //     if (thereAreChanges) {
  //       e.preventDefault();
  //       e.returnValue =
  //         '¡Atención! Los cambios realizados no se guardarán si abandonas la página.';
  //     }
  //   };

  //   window.addEventListener('beforeunload', unloadListener);

  //   const historyListener = (location: any) => {
  //     if (
  //       thereAreChanges &&
  //       !window.confirm(
  //         '¿Estás seguro de que deseas abandonar la página? Los cambios no guardados se perderán.'
  //       )
  //     ) {
  //       history.pushState(null, '', location.pathname);
  //     }
  //   };

  //   window.addEventListener('popstate', () => {
  //     historyListener(window.location);
  //   });

  //   return () => {
  //     window.removeEventListener('beforeunload', unloadListener);
  //     window.removeEventListener('popstate', historyListener);
  //   };
  // }, [thereAreChanges]);

  useEffect(() => {
    const savedProject = localStorage.getItem('currentProject');

    if (currentProject === null && savedProject) {
      dispatch(getProject(JSON.parse(savedProject).id));
    }
  }, []);

  useEffect(() => {
    dispatch(areThereChanges());
  }, [currentLocation, date, volumen, manifoldLength, pipeNumber, pipeType]);

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
