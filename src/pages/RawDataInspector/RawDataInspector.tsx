import { useNavigate } from 'react-router-dom';
import WeatherTable from '../../components/Tables/WeatherTable';
import { useAppSelector } from '../../hooks/reduxHooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { exportJsonToCsv } from '../../utils/exportData';
import ResultsTable from '../../components/Tables/ResultsTable';

const RawDataInspector = ({}) => {
  const navigate = useNavigate();
  const { weatherData, currentLocation, date } = useAppSelector(
    state => state.locations
  );
  const { currentRegister, dataType, returnRoute } = useAppSelector(
    state => state.designer
  );

  const handleReturn = () => {
    navigate(returnRoute);
  };

  const handleDownload = () => {
    exportJsonToCsv(dataType === 'weather' ? weatherData : currentRegister);
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
    </Box>
  );
};

export default RawDataInspector;
