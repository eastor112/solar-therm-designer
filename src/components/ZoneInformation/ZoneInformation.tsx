import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { generalStyles } from '../../styles/general';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { clearWeather, getWeatherData } from '../../redux/locationsSlice';
import { convertIsoToDate } from '../../utils/datesUtils';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

interface StylesMui {
  [key: string]: SxProps<Theme>;
}

interface ZoneInformationProps {
  handleOpen: (value: 'place' | 'date') => void;
}

const ZoneInformation: React.FC<ZoneInformationProps> = ({ handleOpen }) => {
  const { currentLocation, date } = useAppSelector(state => state.locations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentLocation && date) {
      dispatch(getWeatherData());
    } else {
      dispatch(clearWeather());
    }
  }, [currentLocation, date]);

  return (
    <Box sx={styles.container}>
      <Typography variant='h3' sx={generalStyles.h3}>
        Zona de análisis
      </Typography>
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
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Altitud:</span>{' '}
        {currentLocation?.altitude || 'no definido'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <Typography sx={{ ...styles.cardPlace, mb: 0 }}>
          <span className='font-bold'>Fecha:</span>{' '}
          {date ? convertIsoToDate(date) : 'no definido'}
        </Typography>
        <IconButton
          sx={{ width: '35px', p: '2px', color: 'primary.main' }}
          onClick={() => handleOpen('date')}
        >
          <EditCalendarIcon sx={{ height: '20px', m: 0 }} />
        </IconButton>
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

const styles: StylesMui = {
  container: {
    ...generalStyles.cardLayout,
    minWidth: 200,
    maxWidth: 280,
    flex: 1,
  },
  containerParams: {
    width: '45%',
    height: '26%',
    position: 'absolute',
    top: 77,
    right: 32,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPlace: {
    mb: 1.75,
  },
};
