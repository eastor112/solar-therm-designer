import { useNavigate } from 'react-router-dom';
import WeatherTable from '../../components/Tables/WeatherTable';
import { useAppSelector } from '../../hooks/reduxHooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { exportJsonToCsv } from '../../utils/exportData';
import ResultsRawTable from '../../components/Tables/ResultsRawTable';
import AllParamsRawTable from '../../components/Tables/AllParamsRawTable';
import AllResultsRawTable from '../../components/Tables/AllResultsRawTable';
import {
  extendedAllParams,
  transformParams,
  transformRegisters,
} from '../../redux/testData';
import { useOutletContexRoot } from '../RootLayout';
import { useEffect } from 'react';

const RawDataInspector = ({}) => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useOutletContexRoot();
  const { weatherData, currentLocation, date } = useAppSelector(
    state => state.locations
  );
  const { currentRegister, dataType, returnRoute, registers, allParams } =
    useAppSelector(state => state.designer);

  const paramsTransformed =
    dataType === 'comparison'
      ? transformParams(extendedAllParams(allParams, registers))
      : [];

  const registersTransformed =
    dataType === 'comparison' ? transformRegisters(registers) : [];

  const handleReturn = () => {
    navigate(returnRoute);
  };

  useEffect(() => {
    if (
      !(weatherData.length > 0) &&
      !(registers.length > 0) &&
      !(allParams.length > 0) &&
      !(currentRegister.length > 0)
    ) {
      navigate('/dashboard/designer');
    }
  }, []);

  const handleDownload = () => {
    switch (dataType) {
      case 'weather':
        exportJsonToCsv(weatherData, 'wheather');
        break;
      case 'energy':
        exportJsonToCsv(currentRegister, 'energy');
        break;
      case 'comparison':
        exportJsonToCsv(registersTransformed, 'registers');
        exportJsonToCsv(paramsTransformed, 'params');
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <h3 className='text-3xl font-bold mb-8'>SOLARTHERM DESIGNER V0.020</h3>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          pb: 1,
          maxWidth: isSidebarOpen ? '82vw' : '95vw',
        }}
      >
        <Button onClick={handleReturn} variant='contained'>
          Retornar
        </Button>
        <Button onClick={handleDownload} variant='contained'>
          Exportar a csv
        </Button>
      </Box>
      {dataType === 'weather' && (
        <WeatherTable
          rows={weatherData}
          title={`Datos ciudad de ${currentLocation?.place} - ${date}`}
        />
      )}
      {dataType === 'energy' && (
        <ResultsRawTable rows={currentRegister} title={`Energía anual`} />
      )}
      {dataType === 'comparison' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: ' column',
            gap: '20px',
          }}
        >
          <AllParamsRawTable
            rows={paramsTransformed}
            title={`Cálculos teóricos realizados`}
          />
          <AllResultsRawTable
            rows={registersTransformed}
            title={`Registros diarios por cada cálculo`}
          />
        </Box>
      )}
    </Box>
  );
};

export default RawDataInspector;
