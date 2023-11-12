import Box from '@mui/material/Box';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import { extractEnergyKeys, transformData } from '../../redux/testData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import EnhancedTable from '../Tables/ComparisonTable';
import { setSelectedParams } from '../../redux/designerSlice';
import { useMemo } from 'react';

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
        <EnhancedTable
          data={allParams}
          selectedParams={selectedParams}
          setSelectedParams={setSelected}
        />
      </Box>
      {showGraph && (
        <CustomLineChart
          data={transformData(filteredRegisters)}
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
  );
};

export default TheoricalComparison;
