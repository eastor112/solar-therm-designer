import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { FocusEvent } from 'react';
import {
  setManifoldLength,
  setPipeNumber,
  setVolumen,
} from '../../redux/locationsSlice';
import { useNavigate } from 'react-router-dom';

const DesignerForm = () => {
  const { volumen, manifoldLength, pipeNumber } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCalcular = () => {
    navigate('/dashboard/results');
  };

  const selectOnFocus = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    event.target.select();
  };

  return (
    <Box sx={{ ...generalStyles.cardLayout, flex: 1 }}>
      <Typography variant='h3' sx={generalStyles.h3}>
        Parámetros de diseño
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <div className='flex flex-col flex-1 gap-7'>
          <TextField
            type='number'
            id='manifoldLength'
            label='Longitud de Manifold'
            variant='outlined'
            name='manifoldLength'
            value={manifoldLength || 0}
            onChange={val => {
              dispatch(setManifoldLength(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <TextField
            type='number'
            id='pipeline_separation'
            label='Separación tubos'
            variant='outlined'
            name='pipeline_separation'
            value={manifoldLength || 0}
            onChange={val => {
              dispatch(setManifoldLength(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <TextField
            type='number'
            id='pipeNumber'
            label='Número de tubos'
            variant='outlined'
            name='pipeNumber'
            value={pipeNumber || 0}
            onChange={val => {
              dispatch(setPipeNumber(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
        </div>
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
          <TextField
            type='number'
            id='volumen'
            label='Volumen'
            variant='outlined'
            name='volumen'
            value={volumen || 0}
            onChange={val => {
              dispatch(setVolumen(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <TextField
            type='number'
            id='granularity'
            label='Granularidad'
            variant='outlined'
            name='granularity'
            // defaultValue={12}
            onChange={_val => {
              // dispatch(setPipeNumber(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              onClick={handleCalcular}
              variant='contained'
              sx={{ px: 10 }}
            >
              CALCULAR
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DesignerForm;
