import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link as LinkRouter } from 'react-router-dom';
import Link from '@mui/material/Link';

const PipelineParams = () => {
  const [diameters, setDiameters] = useState<number[]>([20, 37]);

  const minDistance = 1;

  const handleDiameters = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setDiameters([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setDiameters([clamped - minDistance, clamped]);
      }
    } else {
      setDiameters(newValue as number[]);
    }
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <Box
      sx={{
        ...generalStyles.cardLayout,
        minWidth: 260,
        maxWidth: 320,
        flex: 1,
      }}
    >
      <Typography variant='h3' sx={generalStyles.h3}>
        Tubo de vacío
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <Box sx={{ flex: 1 }}>
              <InputLabel id='type-select-label'>Tipo </InputLabel>
              <Select
                labelId='type-select-label'
                id='pipeline_type'
                label='Tipo'
                name='pipeline_type'
                fullWidth
                value={0}
              >
                <MenuItem value={0}>Personalizada</MenuItem>
              </Select>
            </Box>
            <Box sx={{ fontSize: 14 }}>
              <Link to='/dashboard/place/new' component={LinkRouter} sx={{}}>
                + Nuevo tipo
              </Link>
            </Box>
          </FormControl>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Box className='font-bold'>
              d<span className='text-xs'>int</span>:
              <span className='font-normal ml-1'>{diameters[0]} mm</span>
            </Box>
            <Box className='font-bold'>
              d<span className='text-xs'>ext</span>:
              <span className='font-normal ml-1'>{diameters[1]} mm</span>
            </Box>
          </Box>

          <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={diameters}
            onChange={handleDiameters}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
            disableSwap
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              type='number'
              id='pipeline_length'
              label='Longitud (m)'
              variant='outlined'
              name='pipeline_length'
              sx={{
                width: '100%',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineParams;
