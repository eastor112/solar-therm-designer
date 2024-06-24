import Box from '@mui/material/Box';
// import DataInspectorGraph from '../../DataInspectorGraph/DataInspectorGraph';
import { useState, useEffect, FC } from 'react';
// import { useAppSelector } from '../../../hooks/reduxHooks';
import { useOutletContexRoot } from '../../../pages/RootLayout';
import ButtonsModals from '../../ButtonsModals/ButtonsModals';
import CustomLineChart from '../../Graphs/LineChart';
// import { capitalize } from '../../../utils/textTransformations';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  height: 551,
};

interface ModalResults {
  handleClose: () => void;
  title: string;
}

const ModalResults: FC<ModalResults> = ({ title, handleClose }) => {
  // const { weatherData, currentLocation } = useAppSelector(
  //   state => state.locations
  // );
  const { isSidebarOpen } = useOutletContexRoot();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [chart, setChart] = useState('temperature');
  const [showGraph, setShowGraph] = useState(true);

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

  // const handleChangeChart = (
  //   _event: React.SyntheticEvent,
  //   newValue: string
  // ) => {
  //   setChart(newValue);
  // };

  return (
    <Box sx={style}>
      {/* <DataInspectorGraph
        city={currentLocation?.place!}
        data={weatherData}
        chart={chart}
        handleChangeChart={handleChangeChart}
        showGraph={showGraph}
      /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {showGraph ? (
          <CustomLineChart
            data={[]}
            title={title}
            columns={['dhi', 'dni', 'ghi']}
            domain={[0, 1000]}
            units='[W/m2]'
            dataKey='date'
          />
        ) : (
          <Box />
        )}

        <ButtonsModals
          handleAccept={() => {}}
          handleCancel={() => {
            handleClose();
          }}
        />
      </Box>
    </Box>
  );
};

export default ModalResults;
