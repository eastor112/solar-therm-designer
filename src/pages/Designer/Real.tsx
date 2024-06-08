import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import DesignerForm from '../../components/DesignerForm/DesignerForm';
import DataInspectorGraph from '../../components/DataInspectorGraph/DataInspectorGraph';
import PipelineParams from '../../components/PipelineParams/PipelineParams';
import AnglesDesigner from '../../components/AnglesDesigner/AnglesDesigner';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useOutletContexRoot } from '../RootLayout';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { getLocationsInformation } from '../../redux/locationsSlice';
import ModalChangePlace from '../../components/Modal/ModalChangePlace';
import ModalDatepicker from '../../components/Modal/ModalDatepicker';

const Real = () => {
  const { weatherData, currentLocation, locations } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useOutletContexRoot();

  const [chart, setChart] = useState('temperature');
  const [showGraph, setShowGraph] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalType, setModalType] = useState<'place' | 'date'>('place');

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
  const handleOpen = (value: 'place' | 'date') => {
    setModalType(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className='flex gap-8'>
        <ZoneInformation handleOpen={handleOpen} />
        <PipelineParams />
        <AnglesDesigner />
        <DesignerForm />
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

export default Real;
