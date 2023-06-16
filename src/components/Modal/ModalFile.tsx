import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

const project = {
  title: 'Model 1 - Piura',
  author: 'Elder Mendoza',
  date: '13/10/2021',
  localization: {
    place: 'Trujillo',
    lat: -8.3543543,
    lng: -77.0283333,
  },
  parameters: {
    volumen: 100,
    manifold: 0.12,
    pipelines: 15,
    pipelineType: 'SDK-3R 1"',
  },
  createdAt: '12/05/23',
  updatedAt: '12/06/23',
};

const ModalFile = () => {
  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        {project.title}
      </Typography>
      <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
        Autor: {project.author}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mb: 1,
        }}
      >
        <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
          Creado: {project.createdAt}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
          Actualizado: {project.updatedAt}
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
                Lugar: {project.localization.place}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Latitud: {project.localization.lat}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Fecha: {project.date}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Longitud: {project.localization.lng}
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
                Volumen: {project.parameters.volumen}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                L. Manifold: {project.parameters.manifold}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                N° de tubos: {project.parameters.pipelines}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                Tipo tubería: {project.parameters.pipelineType}
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
        >
          cancelar
        </Button>
        <Button
          variant='contained'
          sx={{
            width: '7rem',
          }}
        >
          Crear
        </Button>
      </Box>
    </Box>
  );
};

export default ModalFile;
