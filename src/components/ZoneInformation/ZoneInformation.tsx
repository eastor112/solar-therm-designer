import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import piuraImg from '../../assets/piura.jpg';
import { SxProps, Theme, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { getWeatherData } from '../../redux/locationsSlice';
import { convertIsoToDate } from '../../utils/datesUtils';

interface StylesMui {
  [key: string]: SxProps<Theme>;
}

const styles: StylesMui = {
  cardPlace: {
    mb: 2,
  },
};

interface ZoneInformationProps {
  handleOpen: (value: 'place' | 'date') => void;
}

const ZoneInformation: React.FC<ZoneInformationProps> = ({ handleOpen }) => {
  const { currentLocation, date } = useAppSelector(state => state.locations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentLocation && date) {
      dispatch(getWeatherData());
    }
  }, [currentLocation, date]);

  return (
    <Box sx={{ ...generalStyles.cardLayout, minWidth: 380, flex: 1 }}>
      <Typography variant='h3' sx={generalStyles.h3}>
        Zona de análisis
      </Typography>
      <Box
        component='figure'
        sx={{
          width: '45%',
          height: '26%',
          position: 'absolute',
          top: 77,
          right: 32,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={piuraImg} alt='piura' className='max-w-full' />
      </Box>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Ciudad:</span>{' '}
        {currentLocation?.place || 'no definido'}
      </Typography>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Latitud:</span>{' '}
        {currentLocation?.lat || 'no definido'}
      </Typography>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Longitud:</span>{' '}
        {currentLocation?.lng || 'no definido'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography sx={{ ...styles.cardPlace, mb: 0 }}>
          <span className='font-bold'>Fecha:</span>{' '}
          {date ? convertIsoToDate(date) : 'no definido'}
        </Typography>
        <Button variant='contained' onClick={() => handleOpen('date')}>
          Cambiar
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant='contained' onClick={() => handleOpen('place')}>
          Cambiar Zona
        </Button>
      </Box>
    </Box>
  );
};

export default ZoneInformation;
