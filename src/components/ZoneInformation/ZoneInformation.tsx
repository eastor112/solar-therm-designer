import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import piuraImg from '../../assets/piura.jpg';
import { SxProps, Theme, Typography } from '@mui/material';

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
    <Box
      sx={{
        width: 475,
        position: 'relative',
        p: 4,
        background: '#FFF',
        borderRadius: '10px',
      }}
    >
      <Typography
        variant='h3'
        sx={{
          fontSize: 20,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Zona de análisis
      </Typography>
      <Box
        component='figure'
        sx={{ width: 200, position: 'absolute', top: 77, right: 32 }}
      >
        <img src={piuraImg} alt='piura' />
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
          <span className='font-bold'>Fecha de análisis:</span> 25 abril de 2023
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
