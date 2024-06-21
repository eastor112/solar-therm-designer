import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { generalStyles } from '../../styles/general';
const AditionalParams = () => {
  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Parámetros adicionales
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type='number'
            id='n_div'
            label='Granularidad'
            variant='outlined'
            name='n_div'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='nn'
            label='Divisiones'
            variant='outlined'
            name='nn'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='beta_coef'
            label='Coeficiente Beta'
            variant='outlined'
            name='beta_coef'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='f_flujo'
            label='Factor de Flujo'
            variant='outlined'
            name='f_flujo'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AditionalParams;
