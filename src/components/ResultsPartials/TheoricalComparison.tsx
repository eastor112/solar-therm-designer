import Box from '@mui/material/Box';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import { extractEnergyKeys, transformData } from '../../redux/testData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import EnhancedTable from '../Tables/ComparisonTable';
import { setSelectedParams } from '../../redux/designerSlice';
import { useMemo } from 'react';

interface TheoricalComparisonProps {}

const TheoricalComparison: React.FC<TheoricalComparisonProps> = () => {
  const { registers, city, allParams, selectedParams } = useAppSelector(
    state => state.designer
  );
  const dispatch = useAppDispatch();

  const setSelected = (value: number[]) => {
    dispatch(setSelectedParams(value));
  };

  console.log(selectedParams);

  const filteredRegisters = useMemo(() => {
    const filtered = registers.filter(reg => {
      console.log(reg[0].params_id);
      if (selectedParams.includes(reg[0].params_id)) {
        return true;
      }
      return false;
    });
    console.log(filtered.map(f => f[0].params_id));

    return filtered;
  }, [selectedParams, registers]);

  console.log(filteredRegisters.length);

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

      <CustomLineChart
        data={transformData(filteredRegisters)}
        title={
          'Energía teórica anual con diferentes diseños. Ciudad de ' +
          capitalize(city)
        }
        columns={extractEnergyKeys(filteredRegisters)}
        domain={[0, 1.1]}
        size='medium'
        dataKey='day'
        units='[KW-h]'
        legendDirection='horizontal'
      />
    </Box>
  );
};

export default TheoricalComparison;
