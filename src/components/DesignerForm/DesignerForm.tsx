import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';
import { useNavigate } from 'react-router-dom';

const DesignerForm = () => {
  const navigate = useNavigate();

  const handleCalcular = () => {
    navigate('/dashboard/results');
  };

  return (
    <Box sx={{ ...generalStyles.cardLayout, flex: 1 }}>
      <Typography variant='h3' sx={generalStyles.h3}>
        Parámetros de diseño
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
        <div className='flex flex-col flex-1 gap-7'>
          <TextField id='outlined-basic' label='Volumen' variant='outlined' />
          <TextField
            id='manifold-length'
            label='Longitud de Manifold'
            variant='outlined'
          />
          <TextField
            id='pipe-type'
            label='Número de tubos'
            variant='outlined'
          />
        </div>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id='pipe-type-label'>Tipo de tubería</InputLabel>
          <Select
            labelId='pipe-type-label'
            id='pipe-type'
            value={'1'}
            label='Tipo de tubería'
            sx={{
              width: '100%',
            }}
            onChange={() => {}}
          >
            <MenuItem value={'1'}>Tipo 1</MenuItem>
            <MenuItem value={'2'}>Tipo 2</MenuItem>
            <MenuItem value={'3'}>Tipo 3</MenuItem>
          </Select>
        </FormControl>
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
