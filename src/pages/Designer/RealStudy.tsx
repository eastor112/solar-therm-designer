import DataInspectorGraph from '../../components/DataInspectorGraph/DataInspectorGraph';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useOutletContexRoot } from '../RootLayout';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { getLocationsInformation } from '../../redux/locationsSlice';
import ModalChangePlace from '../../components/Modal/ModalChangePlace';
import ModalDatepicker from '../../components/Modal/ModalDatepicker';
import PipelineParamsV2 from '../../components/PipelineParams/PipelineParamsV2';
import TankParams from '../../components/TankParams/TankParams';
import AnglesDesignerSimplify from '../../components/AnglesDesigner/AngleDesignerSimpify';
import Settings from '../../components/Settings/Settings';
import { setModalComponent, setOpenModal } from '../../redux/UISlice';
import Box from '@mui/material/Box';
import {
  ModalType,
  getModalSelector,
} from '../../components/Modal/getModalSelector';

const RealStudy = () => {
  const { weatherData, currentLocation, locations } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useOutletContexRoot();

  const [chart, setChart] = useState('temperature');
  const [showGraph, setShowGraph] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalType] = useState<'place' | 'date'>('place');

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocationsInformation());
    }
  }, [locations]);

  useEffect(() => {
    setShowGraph(false);
    setTimeout(() => {
      setShowGraph(true);
    }, 500);
  }, [isSidebarOpen, windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangeChart = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setChart(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSetCoeficients = () => {
    dispatch(setOpenModal(true));
    dispatch(
      setModalComponent(getModalSelector[ModalType.OTHER_GENERAL_PARAMS])
    );
  };

  return (
    <>
      <div className='flex gap-8'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AnglesDesignerSimplify />
          <TankParams />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <PipelineParamsV2 />
          <Settings label='Otros parámetros' onClick={handleSetCoeficients} />
        </Box>
      </div>
      <DataInspectorGraph
        city={currentLocation?.place!}
        data={weatherData}
        chart={chart}
        handleChangeChart={handleChangeChart}
        showGraph={showGraph}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          {modalType === 'place' && (
            <ModalChangePlace handleClose={handleClose} />
          )}
          {modalType === 'date' && (
            <ModalDatepicker handleClose={handleClose} />
          )}
        </>
      </Modal>
    </>
  );
};

export default RealStudy;
