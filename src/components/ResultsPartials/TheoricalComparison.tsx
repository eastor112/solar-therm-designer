import Box from '@mui/material/Box';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import {
  extendedAllParams,
  extractEnergyKeys,
  transformRegisters,
} from '../../redux/testData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import EnhancedTable from '../Tables/ComparisonTable';
import {
  setDataType,
  setReturnRoute,
  setSelectedParams,
} from '../../redux/designerSlice';
import { useMemo } from 'react';
import { Button } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

interface TheoricalComparisonProps {
  showGraph: boolean;
}

const TheoricalComparison: React.FC<TheoricalComparisonProps> = ({
  showGraph,
}) => {
  const { registers, city, allParams, selectedParams } = useAppSelector(
    state => state.designer
  );
  const dispatch = useAppDispatch();

  const setSelected = (value: number[]) => {
    dispatch(setSelectedParams(value));
  };

  const filteredRegisters = useMemo(() => {
    const filtered = registers.filter(reg => {
      if (selectedParams.includes(reg[0].params_id)) {
        return true;
      }
      return false;
    });

    return filtered;
  }, [selectedParams, registers]);

  return (
    <Box>
      <Box
        sx={{
          pb: '60px',
        }}
      >
        <Box sx={{ display: 'flex', pb: '20px' }}>
          <Box sx={{ flex: 1 }}></Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              marginTop: '40px',
              width: '240px',
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
                dispatch(setDataType('comparison'));
                dispatch(setReturnRoute('/dashboard/results'));
              }}
            >
              Resultados tabulados
            </Button>
          </Box>
        </Box>
        <Box>
          {registers.length > 0 && (
            <EnhancedTable
              data={extendedAllParams(allParams, registers)}
              selectedParams={selectedParams}
              setSelectedParams={setSelected}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
          {showGraph && (
            <CustomLineChart
              data={transformRegisters(filteredRegisters)}
              title={
                'Energía teórica anual con diferentes diseños. Ciudad de ' +
                capitalize(city)
              }
              columns={extractEnergyKeys(filteredRegisters)}
              domain={[0, 1]}
              size='medium'
              dataKey='day'
              units='[KW-h]'
              legendDirection='horizontal'
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TheoricalComparison;
