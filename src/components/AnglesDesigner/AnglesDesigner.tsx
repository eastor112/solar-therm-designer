import { Box, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general/index';
import CircularSlider from 'react-circular-slider-svg';
import { useState } from 'react';

const AnglesDesigner = () => {
  const [azimuth, setAzimuth] = useState(20);
  const [inclination, setInclination] = useState(20);
  return (
    <Box
      sx={{
        ...generalStyles.cardLayout,
        minWidth: 260,
        maxWidth: 260,
        flex: 1,
      }}
    >
      <Typography variant='h3' sx={generalStyles.h3}>
        Ángulos
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // gap: 2,
            color: 'primary.main',
            fontSize: '1.5rem',
            position: 'relative',
            alignItems: 'center',
          }}
        >
          <svg width='0' height='0'>
            <defs>
              <linearGradient
                id='arcProgress'
                x1='100%'
                x2='0%'
                //gradientTransform="rotate(0)"
              >
                <stop offset='0%' stopColor='#ccdcff' stopOpacity='1' />
                <stop offset='100%' stopColor='#556cd6' stopOpacity='1' />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient
                id='arcBg'
                x1='100%'
                x2='0%'
                gradientTransform='rotate(0)'
              >
                <stop offset='0%' stopColor='#ccdcff' stopOpacity='1' />
                <stop offset='100%' stopColor='#556C6C' stopOpacity='1' />
              </linearGradient>
            </defs>
          </svg>

          <Box
            sx={{
              position: 'relative',
              height: 120,
              width: 200,
            }}
          >
            <CircularSlider
              size={200}
              minValue={0}
              maxValue={180}
              startAngle={90}
              endAngle={270}
              angleType={{
                direction: 'cw',
                axis: '-y',
              }}
              handle1={{
                value: inclination,
                onChange: v => setInclination(v),
              }}
              arcColor='url(#arcProgress)'
              arcBackgroundColor='url(#arcBg)'
            />
            <Typography
              sx={{
                left: '36%',
                top: '40%',
                position: 'absolute',
                maxWidth: 'fit',
                color: 'text.primary',
                fontSize: '1.2rem',
              }}
            >
              {inclination.toFixed(2)}°
            </Typography>
            <Typography
              sx={{
                color: 'primary.main',
                left: '30%',
                top: '65%',
                position: 'absolute',
                fontWeight: 'bold',
              }}
            >
              Inclinación
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              height: 120,
              width: 200,
            }}
          >
            <CircularSlider
              size={200}
              minValue={0}
              maxValue={180}
              startAngle={90}
              endAngle={270}
              angleType={{
                direction: 'cw',
                axis: '-y',
              }}
              handle1={{
                value: azimuth,
                onChange: v => setAzimuth(v),
              }}
              arcColor='url(#arcProgress)'
              arcBackgroundColor='url(#arcBg)'
            />
            <Typography
              sx={{
                color: 'primary.main',
                left: '36%',
                top: '65%',
                position: 'absolute',
                fontWeight: 'bold',
              }}
            >
              Azimuth
            </Typography>
            <Typography
              sx={{
                left: '36%',
                top: '40%',
                position: 'absolute',
                maxWidth: 'fit',
                color: 'text.primary',
                fontSize: '1.2rem',
              }}
            >
              {azimuth.toFixed(2)}°
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnglesDesigner;
