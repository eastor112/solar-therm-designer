import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { FocusEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setManifoldLength,
  setPipeNumber,
  setPipeType,
  setVolumen,
} from '../../redux/locationsSlice';

const DesignerForm = () => {
  const { volumen, manifoldLength, pipeNumber, pipeType } = useAppSelector(
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
      <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
        <div className='flex flex-col flex-1 gap-7'>
          <TextField
            type='number'
            id='volumen'
            label='Volumen'
            variant='outlined'
            name='volumen'
            value={volumen}
            onChange={val => {
              dispatch(setVolumen(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <TextField
            type='number'
            id='manifoldLength'
            label='Longitud de Manifold'
            variant='outlined'
            name='manifoldLength'
            value={manifoldLength}
            onChange={val => {
              dispatch(setManifoldLength(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
        </div>
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
          <TextField
            type='number'
            id='pipe-number'
            label='Número de tubos'
            variant='outlined'
            name='pipeNumber'
            value={pipeNumber}
            onChange={val => {
              dispatch(setPipeNumber(+val.target.value));
            }}
            onFocus={selectOnFocus}
          />
          <FormControl sx={{ display: 'flex' }}>
            <InputLabel id='pipe-type-label'>Tipo de tubería</InputLabel>
            <Select
              type='number'
              labelId='pipe-type-label'
              id='pipe-type'
              value={pipeType}
              label='Tipo de tubería'
              sx={{
                width: '100%',
              }}
              onChange={value => {
                dispatch(setPipeType(value.target.value as number));
              }}
            >
              <MenuItem value={0}>Tipo 1</MenuItem>
              <MenuItem value={1}>Tipo 2</MenuItem>
              <MenuItem value={2}>Tipo 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button onClick={handleCalcular} variant='contained' sx={{ px: 10 }}>
          CALCULAR
        </Button>
      </Box>
    </Box>
  );
};

export default DesignerForm;
