import Box from '@mui/material/Box';
import { useState, FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { transformDataForChart } from '../../../utils/resultsChartList';
import { useDesignerStore } from '../../../store/designerStore';
import ResultsChart from '../../Graphs/ResultsChart';
import { SolarDataKeys } from '../../../services/projectsServices';
import GenerateRawDataInspector from '../../../pages/RawDataInspector/GenerarRawDataInspector';

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
};

interface ModalResults {
  handleClose: () => void;
  title: string;
  chartKey: string;
  x: SolarDataKeys;
  y: SolarDataKeys[];
  units: string;
}

const ModalResults: FC<ModalResults> = ({
  title,
  handleClose,
  x,
  y,
  units,
}) => {
  const [showRawData, setShowRawData] = useState(false);
  const { results } = useDesignerStore();
  const [chartData, setChartData] = useState<any[]>([]);
  const [domain, setDomain] = useState([0, 1]);

  useEffect(() => {
    const xData = results[x];
    const yDataArrays = y?.map(key => results[key]);
    const transformedData = transformDataForChart(xData, yDataArrays, x, y);
    setChartData(transformedData.data);
    setDomain(transformedData.domain);
  }, [results, y]);

  return (
    <Box sx={{ ...style, height: showRawData ? '90vh' : 551 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {showRawData ? (
          <GenerateRawDataInspector
            title={title}
            rows={chartData || []}
            maxHeight={'63vh'}
          />
        ) : (
          <ResultsChart
            data={chartData || []}
            title={title}
            columns={y}
            domain={domain}
            units={units}
            dataKey={x}
            legendDirection='horizontal'
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
