import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { ModalType, getModalSelector } from '../Modal/getModalSelector';
import { setModalComponent, setOpenModal } from '../../redux/UISlice';
import SettingsIcon from '@mui/icons-material/Settings';

const TankParams = () => {
  const dispatch = useAppDispatch();

  const handleSetCoeficients = () => {
    dispatch(setOpenModal(true));
    dispatch(setModalComponent(getModalSelector[ModalType.OTHER_TANK_PARAMS]));
  };
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
        </Box>
        <Typography
          color='initial'
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            mt: 1,
            color: 'secondary',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 400,
            '&:hover': {
              color: 'blue',
              textDecoration: 'underline',
            },
          }}
          onClick={handleSetCoeficients}
        >
          <SettingsIcon sx={{ width: '16px' }} />
          Coeficientes
        </Typography>
      </Box>
    </Box>
  );
};

export default TankParams;
