import { useState } from 'react';
import Modal from '@mui/material/Modal';
import PipelineParamsV2 from '../../components/PipelineParams/PipelineParamsV2';
import TankParams from '../../components/TankParams/TankParams';
import AnglesDesignerSimplify from '../../components/AnglesDesigner/AnglesDesignerSimplify';
import Settings from '../../components/Settings/Settings';
import Box from '@mui/material/Box';
import { generalStyles } from '../../styles/general/index';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ModalResults from '../../components/Modal/Results/ModalResults';
import ModalOtherGeneralParams from '../../components/Modal/Params/ModalOtherGeneralParams';
import { useDesignerStore } from '../../store/designerStore';
import { resultsChartsList } from '../../utils/resultsChartList';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { InfoOutlined } from '@mui/icons-material';

const RealStudy = () => {
  const { calculate, results, clearResults } = useDesignerStore();
  const { setIsLoading } = useUIStore();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'other' | 'result'>('result');
  const [chartParams, setChartParams] = useState<any>({});

  const handleClose = () => setOpen(false);

  const handleSetCoeficients = () => {
    setModalType('other');
    setOpen(true);
  };

  const onCalculateResults = async () => {
    setIsLoading(true);
    await calculate();
    setIsLoading(false);
  };

  const onDeleteResults = () => {
    clearResults();
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box
          sx={{
            ...generalStyles.cardLayout,
            width: '470px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 4,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <AnglesDesignerSimplify />
              <TankParams />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <PipelineParamsV2 />
              <Settings
                label='Otros parámetros'
                onClick={handleSetCoeficients}
              />
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant='contained'
              sx={{ mt: 2, width: '200px' }}
              size='small'
              onClick={onCalculateResults}
            >
              {results ? 'Recalcular' : 'Calcular'}
            </Button>
            <Button
              variant='contained'
              sx={{ mt: 2, width: '200px' }}
              size='small'
              onClick={async () => {
                navigate('/dashboard/inspector/pvgis');
              }}
              disabled={!results}
            >
              Ver data
            </Button>
            <Button
              variant='contained'
              sx={{ width: '200px' }}
              size='small'
              onClick={onDeleteResults}
              disabled={!results}
            >
              Borrar resultados
            </Button>
          </Box>
        </Box>

        {results ? (
          <Box>
            <Typography variant='h3' sx={generalStyles.h3}>
              RESULTADOS
            </Typography>
            <List>
              {resultsChartsList.map(chart => (
                <ListItem
                  key={chart.key}
                  disablePadding
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'blue' },
                    listStyle: 'outside',
                    pl: 3,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 8,
                      height: 8,
                      backgroundColor: 'black',
                      display: 'inline-block',
                    },
                  }}
                  onClick={() => {
                    setModalType('result');
                    setChartParams({ ...chart, chartKey: chart.key });
                    setOpen(true);
                  }}
                >
                  <ListItemText>{chart.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            px={3}
          >
            <InfoOutlined
              sx={{
                fontSize: '4rem',
                color: 'text.disabled',
                mb: 2,
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                color: 'text.disabled',
                fontWeight: 'medium',
                fontSize: '1.2rem',
                lineHeight: 1.6,
                maxWidth: '600px',
                mb: 2,
              }}
            >
              Aún no tienes resultados. Fija los parámetros y luego presiona
              calcular.
            </Typography>
          </Box>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          {modalType === 'result' && (
            <ModalResults handleClose={handleClose} {...chartParams} />
          )}
          {modalType === 'other' && (
            <ModalOtherGeneralParams handleClose={() => setOpen(false)} />
          )}
        </>
      </Modal>
    </>
  );
};

export default RealStudy;
