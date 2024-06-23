import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';

const TankParams = () => {
  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Parámetros del tanque
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type='number'
            id='vol_tk'
            label='Volumen'
            variant='outlined'
            name='vol_tk'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title='Volumen del tanque de agua' placement='top'>
                    <InfoIcon sx={{ width: '18px' }} />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type='number'
            id='e_tk'
            label='Espesor tanque'
            variant='outlined'
            name='e_tk'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='k_tk'
            label='K tanque'
            variant='outlined'
            name='k_tk'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='e_aisl'
            label='Espesor aislante'
            variant='outlined'
            name='e_aisl'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='k_aisl'
            label='K aislante'
            variant='outlined'
            name='k_aisl'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='e_cub'
            label='Espesor cub.'
            variant='outlined'
            name='e_cub'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='k_cub'
            label='K cub.'
            variant='outlined'
            name='k_cub'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='h_int'
            label='h interior.'
            variant='outlined'
            name='h_int'
            sx={{
              width: '100%',
            }}
            value={0}
            size='small'
          />
          <TextField
            type='number'
            id='h_ext'
            label='h exterior'
            variant='outlined'
            name='h_ext'
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

export default TankParams;
