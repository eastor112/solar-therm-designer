import Box from '@mui/material/Box';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import { extractEnergyKeys, transformData } from '../../redux/testData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import EnhancedTable from '../Tables/ComparisonTable';
import { setSelectedParams } from '../../redux/designerSlice';

interface TheoricalComparisonProps {}

const TheoricalComparison: React.FC<TheoricalComparisonProps> = () => {
  const { registers, city, allParams, selectedParams } = useAppSelector(
    state => state.designer
  );
  const dispatch = useAppDispatch();

  const setSelected = (value: number[]) => {
    dispatch(setSelectedParams(value));
  };

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
        data={transformData(registers)}
        title={
          'Energía teórica anual con diferentes diseños. Ciudad de ' +
          capitalize(city)
        }
        columns={extractEnergyKeys(registers)}
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
