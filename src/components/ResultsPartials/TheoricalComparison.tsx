import Box from '@mui/material/Box';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import { extractEnergyKeys, transformData } from '../../redux/testData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import EnhancedTable from '../Tables/ComparisonTable';
import { setSelectedParams } from '../../redux/designerSlice';
import { useMemo } from 'react';
import { ExtendedParams, IParams } from '../../types/paramsTypes';
import { calculateAnnualEnergyTotal } from '../../utils/energyUtils';

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

  const extendedAllParams = (allParams: IParams[]): ExtendedParams[] => {
    return allParams.map(param => {
      const r = registers.find(reg => reg[0].params_id === param.id);
      return { ...param, annualEnergy: calculateAnnualEnergyTotal(r!) };
    });
  };

  return (
    <Box>
      <Box
        sx={{
          pb: '60px',
        }}
      >
        {registers.length > 0 && (
          <EnhancedTable
            data={extendedAllParams(allParams)}
            selectedParams={selectedParams}
            setSelectedParams={setSelected}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
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
      </Box>
    </Box>
  );
};

export default TheoricalComparison;
