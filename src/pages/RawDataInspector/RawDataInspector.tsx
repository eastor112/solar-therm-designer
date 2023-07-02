import { useNavigate } from 'react-router-dom';
import TableMUI from '../../components/Tables/TableMUI';
import { useAppSelector } from '../../hooks/reduxHooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { exportJsonToCsv } from '../../utils/exportData';

const RawDataInspector = () => {
  const navigate = useNavigate();
  const { weatherData, currentLocation, date } = useAppSelector(
    state => state.locations
  );

  const handleReturn = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    exportJsonToCsv(weatherData);
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
      <TableMUI
        rows={weatherData}
        title={`Datos ciudad de ${currentLocation?.place} - ${date}`}
      />
    </Box>
  );
};

export default RawDataInspector;
