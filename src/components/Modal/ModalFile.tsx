import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getShortName } from '../../utils/textTransformations';
import { formatDate, getRelativeDate } from '../../utils/datesUtils';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { useDesignerStore } from '../../store/designerStore';
import { useEffect, useState } from 'react';
import { reverseGeocode } from '../../services/locationServices';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 430,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const ModalFile = () => {
  const navigate = useNavigate();
  const { setOpenModal } = useUIStore();
  const { currentProject, previewProject, openProject } = useDesignerStore();
  const [place, setPlace] = useState<string | null>(null);

  useEffect(() => {
    if (previewProject) {
      reverseGeocode(previewProject?.latitud, previewProject?.longitud).then(
        place => {
          setPlace(place || '');
        }
      );
    }
  }, [previewProject]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpenProject = () => {
    if (previewProject) {
      navigate('/dashboard/designer');
      openProject(previewProject);
    }
    setOpenModal(false);
  };

  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        {previewProject?.name_project}
      </Typography>
      <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
        Autor:{' '}
        {getShortName(
          previewProject?.user.first_name,
          previewProject?.user.last_name
        )}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mb: 1,
        }}
      >
        <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
          Creado: {formatDate(previewProject?.created_at)}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
          Actualizado: {getRelativeDate(previewProject?.updated_at)}
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            bgcolor: '#EEE',
            p: 2,
            mb: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ fontSize: '1rem', fontWeight: 500 }}
          >
            Localización:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 5,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Latitud: {previewProject?.latitud || 'no definido'}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Longitud: {previewProject?.longitud || 'no definido'}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Ciudad: {place}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Fecha: {formatDate(previewProject?.date_time) || 'no definido'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: '#EEE',
            p: 2,
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ fontSize: '1rem', fontWeight: 500 }}
          >
            Parámetros:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 5,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Volumen: {previewProject?.vol_tank || 'no definido'}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Azimuth: {previewProject?.azimuth || 'no definido'}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                N° de tubos: {previewProject?.num_tubos || 'no definido'}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Inclinación: {previewProject?.inclinacion || 'no definido'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Button
          variant='outlined'
          sx={{
            width: '7rem',
          }}
          onClick={handleClose}
        >
          Cerrar
        </Button>
        <Button
          variant='contained'
          sx={{
            width: '7rem',
          }}
          onClick={handleOpenProject}
          disabled={previewProject?.id === currentProject?.id}
        >
          Abrir
        </Button>
      </Box>
    </Box>
  );
};

export default ModalFile;
