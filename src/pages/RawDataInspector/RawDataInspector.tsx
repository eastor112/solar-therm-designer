import { useNavigate } from 'react-router-dom';
import WeatherTable from '../../components/Tables/WeatherTable';
import { useAppSelector } from '../../hooks/reduxHooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { exportJsonToCsv } from '../../utils/exportData';
import ResultsTable from '../../components/Tables/ResultsTable';
import {
  extendedAllParams,
  transformParams,
  transformRegisters,
} from '../../redux/testData';
import CoparisonRawTable from '../../components/Tables/CoparisonRawTable';

const RawDataInspector = ({}) => {
  const navigate = useNavigate();
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
        <ResultsTable rows={currentRegister} title={`Energía anual`} />
      )}
      {dataType === 'comparison' && (
        <CoparisonRawTable rows={paramsTransformed} title={`Energía anual`} />
      )}
    </Box>
  );
};

export default RawDataInspector;
