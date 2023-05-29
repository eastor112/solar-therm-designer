import { useNavigate } from 'react-router-dom';
import TableMUI from '../../components/Tables/TableMUI';
import { useAppSelector } from '../../hooks/reduxHooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { exportJsonToCsv } from '../../utils/exportData';

const RawDataInspector = () => {
  const navigate = useNavigate();
  const { city, date } = useAppSelector(state => state.designer);
  const { data } = useAppSelector(state => state.designer);

  const handleReturn = () => {
    navigate('/dashboard/designer');
  };

  const handleDownload = () => {
    exportJsonToCsv(data);
  };

  return (
    <div>
      <h3 className='text-3xl font-bold mb-8'>SOLARTHERM DESIGNER V0.020</h3>
      {
        // Object.keys()
      }
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
      <TableMUI rows={data} title={`Datos ciudad de ${city} - ${date}`} />
    </div>
  );
};

export default RawDataInspector;
