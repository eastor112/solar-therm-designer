import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { FocusEvent } from 'react';
import { setPipeNumber, setVolumen } from '../../redux/locationsSlice';
import { useNavigate } from 'react-router-dom';
import {
  computeResults,
  getAllProjectParams,
  setGranularity,
  setPipelineSeparation,
} from '../../redux/designerSlice';

const DesignerFormTheoretical = () => {
  const { volumen, pipeNumber, currentProject } = useAppSelector(
    state => state.locations
  );
  const { granularity, pipelineSeparation, isLoading } = useAppSelector(
    state => state.designer
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCompute = async () => {
    await dispatch(computeResults());
    if (currentProject) {
      await dispatch(getAllProjectParams(currentProject.id));
    }

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 2,
          }}
        >
          <TextField
            type='number'
            size='small'
            id='pipeline_separation'
            label='Sep. tubos (m)'
            variant='outlined'
            name='pipeline_separation'
            value={pipelineSeparation || 0}
            onChange={val => {
              dispatch(setPipelineSeparation(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <TextField
            type='number'
            size='small'
            id='pipeNumber'
            label='Número tubos (u)'
            variant='outlined'
            name='pipeNumber'
            value={pipeNumber || 10}
            onChange={val => {
              dispatch(setPipeNumber(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />

          <TextField
            type='number'
            size='small'
            id='volumen'
            label='Volumen (m3)'
            variant='outlined'
            name='volumen'
            value={volumen || 1}
            onChange={val => {
              dispatch(setVolumen(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <TextField
            type='number'
            size='small'
            id='granularity'
            label='Granularidad (u)'
            variant='outlined'
            name='granularity'
            value={granularity || 12}
            onChange={val => {
              dispatch(setGranularity(+val.target.value));
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
              onClick={handleCompute}
              variant='contained'
              sx={{ width: '100%' }}
              disabled={isLoading}
            >
              CALCULAR
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DesignerFormTheoretical;
