import { useNavigate } from 'react-router-dom';
import WeatherTable from '../../components/Tables/WeatherTable';
import { useAppSelector } from '../../hooks/reduxHooks';
import Box from '@mui/material/Box';
import ResultsRawTable from '../../components/Tables/ResultsRawTable';
import AllParamsRawTable from '../../components/Tables/AllParamsRawTable';
import AllResultsRawTable from '../../components/Tables/AllResultsRawTable';
import {
  extendedAllParams,
  transformParams,
  transformRegisters,
} from '../../redux/testData';
import { FC, useEffect } from 'react';

interface RawDataInspectorProps {
  title: string;
}

const RawDataInspectorSimplify: FC<RawDataInspectorProps> = ({ title }) => {
  const navigate = useNavigate();
  const { weatherData } = useAppSelector(state => state.locations);
  const { currentRegister, dataType, registers, allParams } = useAppSelector(
    state => state.designer
  );

  const paramsTransformed =
    dataType === 'comparison'
      ? transformParams(extendedAllParams(allParams, registers))
      : [];

  const registersTransformed =
    dataType === 'comparison' ? transformRegisters(registers) : [];

  useEffect(() => {
    if (
      !(weatherData.length > 0) &&
      !(registers.length > 0) &&
      !(allParams.length > 0) &&
      !(currentRegister.length > 0)
    ) {
      navigate('/dashboard/designer');
    }
  }, []);

  return (
    <Box>
      {dataType === 'weather' && (
        <WeatherTable rows={weatherData} title={title} />
      )}
      {dataType === 'energy' && (
        <ResultsRawTable rows={currentRegister} title={`Energía anual`} />
      )}
      {dataType === 'comparison' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: ' column',
            gap: '20px',
          }}
        >
          <AllParamsRawTable
            rows={paramsTransformed}
            title={`Cálculos teóricos realizados`}
          />
          <AllResultsRawTable
            rows={registersTransformed}
            title={`Registros diarios por cada cálculo`}
          />
        </Box>
      )}
    </Box>
  );
};

export default RawDataInspectorSimplify;
