import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
} from '@mui/material';

import { Link as LinkRouter } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const ModalChangePlace = () => {
  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Localización del proyecto
      </Typography>

      <Typography
        id='modal-modal-title'
        variant='subtitle1'
        component='p'
        sx={{ fontSize: '0.9rem', my: 1 }}
      >
        Seleccione o agregue una nueva ubicación
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        <FormControl fullWidth>
          <Box sx={{ flex: 1 }}>
            <InputLabel id='city-select-label'>Ciudad</InputLabel>
            <Select
              labelId='city-select-label'
              id='city-select'
              value={0}
              label='Ciudad'
              // onChange={handleChange}
              fullWidth
            >
              <MenuItem value={0}>Ninguna</MenuItem>
              <MenuItem value={10}>Piura</MenuItem>
              <MenuItem value={20}>Trujillo</MenuItem>
            </Select>
          </Box>
          <Box sx={{ fontSize: 14 }}>
            <Link to='/dashboard/place/new' component={LinkRouter} sx={{}}>
              + Nueva ubicación
            </Link>
          </Box>
        </FormControl>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Button variant='outlined'>Cancelar</Button>
          <Button variant='contained'>Guardar</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalChangePlace;
