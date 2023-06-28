import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { Link as LinkRouter } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useState } from 'react';
import { setLocation } from '../../redux/locationsSlice';

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

interface ModalChangePlaceProps {
  handleClose: () => void;
}

const ModalChangePlace: React.FC<ModalChangePlaceProps> = ({ handleClose }) => {
  const { locations, currentLocation } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();
  const [cityId, setCityId] = useState<number>(currentLocation?.id || 0);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setCityId(event.target.value as number);
  };

  const handleSaveCity = () => {
    const currentLocation = locations.find(location => location.id === cityId);
    if (currentLocation) {
      dispatch(setLocation(currentLocation));
    }
    handleClose();
  };

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
              value={cityId}
              label='Ciudad'
              name='city'
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={0}>Ninguna</MenuItem>
              {locations.map(location => (
                <MenuItem key={location.id} value={location.id}>
                  {location.place}
                </MenuItem>
              ))}
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
          <Button variant='outlined' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleSaveCity}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalChangePlace;
