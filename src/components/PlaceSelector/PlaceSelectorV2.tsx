import Box from '@mui/material/Box';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { defaultPlaces } from './helper';

interface ModalChangePlaceProps {
  onChange?: (value: number) => void;
  onShowMap?: (value: boolean) => void;
  showMap?: boolean;
  customPlace?: string;
  initialCityId?: number;
}

const PlaceSelectorV2: React.FC<ModalChangePlaceProps> = ({
  onChange = () => {},
  onShowMap = () => {},
  showMap = false,
  customPlace,
  initialCityId = 0,
}) => {
  const [cityId, setCityId] = useState<number>(initialCityId);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const cityId = event.target.value;
    setCityId(cityId as number);
    onChange(cityId as any);
  };

  useEffect(() => {
    if (customPlace) {
      setCityId(-1);
    }
  }, [customPlace]);

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
            {customPlace ? (
              <MenuItem value={-1}>[ {customPlace} ]</MenuItem>
            ) : null}
            <MenuItem value={0}>Ninguna</MenuItem>
            {defaultPlaces.map(place => (
              <MenuItem key={place.id} value={place.id}>
                {place.place}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            fontSize: 12,
            cursor: 'pointer',
            '&:hover': {
              color: 'blue',
              textDecoration: 'underline',
            },
          }}
          onClick={() => onShowMap(!showMap)}
        >
          {showMap ? 'Cerrar mapa' : '+ Otra ubicación'}
        </Box>
      </FormControl>
    </Box>
  );
};

export default PlaceSelectorV2;
