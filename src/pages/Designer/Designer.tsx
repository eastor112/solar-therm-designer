import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import trujilloData from '../../data/trujillo.csv';
import dayjs from 'dayjs';
import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import DesignerForm from '../../components/DesignerForm/DesignerForm';
import DataInspectorGraph from '../../components/DataInspectorGraph/DataInspectorGraph';
import { useOutletContexRoot } from '../RootLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setDate } from '../../redux/designerSlice';
import Modal from '@mui/material/Modal';
import ModalChangePlace from '../../components/Modal/ModalChangePlace';
import ModalDatepicker from '../../components/Modal/ModalDatepicker';
import { getLocationsInformation } from '../../redux/locationsSlice';

const defaultDateValue = dayjs(
  trujilloData[trujilloData.length - 1].PeriodStart.split('T')[0]
).subtract(1, 'day');

const Designer = () => {
  const { currentProject, weatherData, currentLocation } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useOutletContexRoot();

  const [chart, setChart] = useState('temperature');
  const [showGraph, setShowGraph] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalType, setModalType] = useState<'place' | 'date'>('place');

  useEffect(() => {
    dispatch(getLocationsInformation());
    dispatch(setDate(defaultDateValue.format('DD/MM/YYYY')));
    return () => {};
  }, []);

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = (value: 'place' | 'date') => {
    setModalType(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <div className='flex flex-col gap-8'>
          {currentProject && (
            <>
              <h3 className='text-3xl font-bold'>SOLARTHERM DESIGNER V0.020</h3>
              <div className='flex gap-8'>
                <ZoneInformation handleOpen={handleOpen} />
                <DesignerForm />
              </div>
              <DataInspectorGraph
                city={currentLocation?.place!}
                data={weatherData}
                chart={chart}
                handleChangeChart={handleChangeChart}
                showGraph={showGraph}
              />
            </>
          )}
        </div>
      </Box>
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

export default Designer;
