import Box from '@mui/material/Box';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import Button from '@mui/material/Button';
import Resume from '../../components/Resumen/Resume';
import { Link as LinkRouter } from 'react-router-dom';
import { setDataType, setReturnRoute } from '../../redux/designerSlice';

interface TheoricalResultsProps {
  showGraph: boolean;
}

const TheoricalResults: React.FC<TheoricalResultsProps> = ({ showGraph }) => {
  const dispatch = useAppDispatch();
  const { city, currentRegister } = useAppSelector(state => state.designer);
  const { date } = useAppSelector(state => state.locations);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box sx={{ flex: 1 }}>
        {showGraph && (
          <CustomLineChart
            data={currentRegister}
            title={'Enegía teórica anual en ' + capitalize(city)}
            columns={['energy']}
            domain={[0, 0.8]}
            size='medium'
            dataKey='day'
            date={date ? date : undefined}
            units='[KW-h]'
            interval={14}
          />
        )}
      </Box>

      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <Button
            component={LinkRouter}
            variant='contained'
            to='/dashboard/designer'
          >
            Modificar parámetros
          </Button>
          <Button
            component={LinkRouter}
            variant='contained'
            to='/dashboard/inspector'
            onClick={() => {
              dispatch(setDataType('energy'));
              dispatch(setReturnRoute('/dashboard/results'));
            }}
          >
            Resultados tabulados
          </Button>
        </Box>
        <Resume />
      </Box>
    </Box>
  );
};

export default TheoricalResults;
