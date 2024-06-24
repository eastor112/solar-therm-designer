import Box from '@mui/material/Box';
import {
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
import { setCurrentLocation } from '../../redux/locationsSlice';

interface ModalChangePlaceProps {
  onChange?: (event: SelectChangeEvent<number>) => void;
}

const PlaceSelector: React.FC<ModalChangePlaceProps> = ({
  onChange = () => {},
}) => {
  const { locations, currentLocation } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();
  const [cityId, setCityId] = useState<number>(currentLocation?.id || 0);

  const handleSaveCity = (cityId: number) => {
    const currentLocation = locations.find(location => location.id === cityId);
    if (currentLocation) {
      dispatch(setCurrentLocation(currentLocation));
    }
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const cityId = event.target.value;
    setCityId(cityId as number);
    handleSaveCity(cityId as number);

    onChange(cityId as any);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        mt: 1.5,
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
            size='small'
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
            + Otra ubicación
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export default PlaceSelector;
