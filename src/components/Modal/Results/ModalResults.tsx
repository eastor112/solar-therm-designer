import Box from '@mui/material/Box';
import { useState, FC } from 'react';
import CustomLineChart from '../../Graphs/LineChart';
import Button from '@mui/material/Button';
import RawDataInspectorSimplify from '../../../pages/RawDataInspector/RawDataInspectorSimplify';

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
}

const ModalResults: FC<ModalResults> = ({ title, handleClose }) => {
  const [showRawData, setShowRawData] = useState(false);

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
          <CustomLineChart
            data={[]}
            title={title}
            columns={['dhi', 'dni', 'ghi']}
            domain={[0, 1000]}
            units='[W/m2]'
            dataKey='date'
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
