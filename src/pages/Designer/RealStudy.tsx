import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { getLocationsInformation } from '../../redux/locationsSlice';
import ModalChangePlace from '../../components/Modal/ModalChangePlace';
import ModalDatepicker from '../../components/Modal/ModalDatepicker';
import PipelineParamsV2 from '../../components/PipelineParams/PipelineParamsV2';
import TankParams from '../../components/TankParams/TankParams';
import AnglesDesignerSimplify from '../../components/AnglesDesigner/AngleDesignerSimpify';
import Settings from '../../components/Settings/Settings';
import { setModalComponent, setOpenModal } from '../../redux/UISlice';
import Box from '@mui/material/Box';
import { generalStyles } from '../../styles/general/index';
import Button from '@mui/material/Button';
import {
  ModalType,
  getModalSelector,
} from '../../components/Modal/getModalSelector';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ModalResults from '../../components/Modal/Results/ModalResults';

const data = [
  { title: 'Inclinación Solar', key: 'inclinación_solar' },
  { title: 'Azimuth Solar', key: 'azimuth_solar' },
  {
    title:
      'Intensidad de la Radiación Extraterrestre sobre Superficie Horizontal [W/m2]',
    key: 'intensidad_radiación',
  },
  {
    title:
      'Irradiación Extraterrestre sobre Superficie Horizontal por Intervalo de Tiempo [J/m2 \\Deltat]',
    key: 'irradiación_intervalo',
  },
  { title: 'Evolucion del Numero de Nu.Gr/Pr', key: 'evolución_numero' },
  { title: 'Evolucion del Numero de Reynolds', key: 'evolución_reynolds' },
  {
    title: 'Flujo Masico de Agua Caiente que Sale del Tubo al Vacio',
    key: 'flujo_masico',
  },
  {
    title: 'Velocidad Media Agua Caiente que Sale del Tubo al Vacio',
    key: 'velocidad_media',
  },
  {
    title:
      'Temperaturas de Mezcla, de Salida y del Tanque de la Terma Solar [C] - Correlacion de Mendoza (2023)',
    key: 'temperaturas_mezcla',
  },
  {
    title: 'Eficiencia Termica de la Terma Solar (según la 1ra ley)',
    key: 'eficiencia_termica',
  },
  {
    title: 'Energia Térmica acumulada en el termotanque [MJ]',
    key: 'energia_termica',
  },
];

const RealStudy = () => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector(state => state.locations);
  const [modalType, setModalType] = useState<'place' | 'date' | 'result'>(
    'place'
  );
  const [open, setOpen] = useState(false);
  const [chartParams, setChartParams] = useState<any>({});

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocationsInformation());
    }
  }, [locations]);

  const handleSetCoeficients = () => {
    dispatch(setOpenModal(true));
    dispatch(
      setModalComponent(getModalSelector[ModalType.OTHER_GENERAL_PARAMS])
    );
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
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              sx={{ mt: 2, width: '220px' }}
              size='small'
            >
              Calcular
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography variant='h3' sx={generalStyles.h3}>
            RESULTADOS
          </Typography>
          <List>
            {data.map(chart => (
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
                  setChartParams({
                    title: chart.title,
                  });
                  setOpen(true);
                }}
              >
                <ListItemText>{chart.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          {modalType === 'place' && (
            <ModalChangePlace handleClose={handleClose} />
          )}
          {modalType === 'date' && (
            <ModalDatepicker handleClose={handleClose} />
          )}
          {modalType === 'result' && (
            <ModalResults handleClose={handleClose} {...chartParams} />
          )}
        </>
      </Modal>
    </>
  );
};

export default RealStudy;
