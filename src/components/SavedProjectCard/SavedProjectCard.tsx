import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const SavedProjectCard = () => {
  return (
    <Box
      sx={{
        borderRadius: '3px',
        boxShadow: '-1px 1px 5px 1px rgba(0,0,0,0.2)',
        padding: '1rem',
      }}
    >
      <Typography
        variant='subtitle1'
        component='h6'
        sx={{
          fontWeight: 500,
          mb: 1,
        }}
      >
        Modelo 1 - Trujillo 1
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
        }}
      >
        <Box>
          <Typography component='p'>Autor: Elder Mendoza</Typography>
          <Typography component='p'>Creado: 10/04/2023</Typography>
        </Box>
        <Box>
          <Typography component='p'>Ciudad: Trujillo</Typography>
          <Typography component='p'>Actualizado: 15/04/2023</Typography>
        </Box>
        <Box
          sx={{
            textAlign: 'right',
            flex: 1,
          }}
        >
          <Button variant='contained'>Abrir</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedProjectCard;
