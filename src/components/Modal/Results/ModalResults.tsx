import Box from '@mui/material/Box';
import { useState, FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import RawDataInspectorSimplify from '../../../pages/RawDataInspector/RawDataInspectorSimplify';
import {
  SolarDataKeys,
  transformDataForChart,
} from '../../../utils/resultsChartList';
import { useDesignerStore } from '../../../store/designerStore';
import ResultsChart from '../../Graphs/ResultsChart';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  height: 551,
};

interface ModalResults {
  handleClose: () => void;
  title: string;
  chartKey: string;
  x?: SolarDataKeys;
  y?: SolarDataKeys[];
}

const working = ['inclinacion_solar', 'azimuth_solar'];

const ModalResults: FC<ModalResults> = ({
  chartKey,
  title,
  handleClose,
  x,
  y,
}) => {
  const [showRawData, setShowRawData] = useState(false);
  const { results } = useDesignerStore();
  const [chartData, setChartData] = useState<any[]>([]);

  // console.log(chartKey);
  useEffect(() => {
    const xData = results[SolarDataKeys.HoraStd];
    const yDataArrays = y?.map(key => results[key]);
    // console.log({ xData, yDataArrays });
    if (xData && yDataArrays && working.includes(chartKey)) {
      const transformedData = transformDataForChart(xData, yDataArrays);
      setChartData(transformedData);
    }
  }, [results, y]);

  // console.log(working.includes(chartKey));
  // console.log(chartData);

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {showRawData ? (
          <RawDataInspectorSimplify title={title} />
        ) : (
          <ResultsChart
            data={working.includes(chartKey) ? chartData : []}
            title={title}
            columns={['y0']}
            // domain={[0, 90]}
            domain={
              chartKey === SolarDataKeys.InclinacionSolar
                ? [0, 90]
                : [-200, 200]
            }
            units='°'
            dataKey={x || SolarDataKeys.HoraStd}
          />
        )}

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            type='button'
            variant='contained'
            sx={{ mt: 2 }}
            size='small'
            onClick={() => {
              setShowRawData(!showRawData);
            }}
          >
            {showRawData ? 'Gráfica' : 'Datos tabulados'}
          </Button>

          {showRawData && (
            <Button
              type='button'
              variant='contained'
              sx={{ mt: 2 }}
              size='small'
              // onClick={handleCancel}
            >
              Exportar csv
            </Button>
          )}

          <Button
            type='button'
            variant='contained'
            sx={{ mt: 2 }}
            size='small'
            onClick={() => handleClose()}
          >
            Cerrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalResults;
