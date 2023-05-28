import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import piuraImg from '../../assets/piura.jpg';
import { SxProps, Theme, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';

interface StylesMui {
  [key: string]: SxProps<Theme>;
}

const styles: StylesMui = {
  cardPlace: {
    mb: 2,
  },
};

const ZoneInformation = () => {
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
        <span className='font-bold'>Ciudad:</span> Piura
      </Typography>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Latitud:</span> 5.535
      </Typography>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Longitud:</span> -80.564
      </Typography>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Velocidad de viento:</span> 5 m/s
      </Typography>
      <Typography sx={styles.cardPlace}>
        <span className='font-bold'>Temperatura:</span> 25 °C
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
          <span className='font-bold'>Fecha:</span> 25 abr. 2023
        </Typography>
        <Button variant='contained'>Cambiar</Button>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant='contained'>Cambiar Zona</Button>
      </Box>
    </Box>
  );
};

export default ZoneInformation;
