import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { generalStyles } from '../../styles/general';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { clearWeather, getWeatherData } from '../../redux/locationsSlice';
import dayjs from '../../utils/datesUtils';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

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
      <Box>
        <Typography variant='h3' sx={generalStyles.h3}>
          Lugar
        </Typography>
        <Box
          sx={{
            ...styles.cardPlace,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>
            <span className='font-bold'>Ciudad:</span>{' '}
            {currentLocation?.place || 'no definido'}
          </Typography>

          <IconButton
            sx={{ width: '35px', p: '2px', color: 'primary.main' }}
            onClick={() => handleOpen('place')}
          >
            <EditLocationAltIcon sx={{ height: '20px', m: 0 }} />
          </IconButton>
        </Box>
        <Typography sx={styles.cardPlace}>
          <span className='font-bold'>Latitud:</span>{' '}
          {currentLocation?.lat || 'no definido'}
        </Typography>
        <Typography sx={styles.cardPlace}>
          <span className='font-bold'>Longitud:</span>{' '}
          {currentLocation?.lng || 'no definido'}
        </Typography>
      </Box>
      <Box>
        <Typography variant='h3' sx={generalStyles.h3}>
          Día
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ ...styles.cardPlace, mb: 0 }}>
            {date
              ? dayjs(date, 'DD/MM/YYYY').format('DD [de] MMMM')
              : 'no definido'}
          </Typography>
          <IconButton
            sx={{ width: '35px', p: '2px', color: 'primary.main' }}
            onClick={() => handleOpen('date')}
          >
            <EditCalendarIcon sx={{ height: '20px', m: 0 }} />
          </IconButton>
        </Box>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardPlace: {
    mb: 1.75,
  },
};
