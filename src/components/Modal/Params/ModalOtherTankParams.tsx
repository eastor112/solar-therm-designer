import Box from '@mui/material/Box';
import InputField from '../../InputField/InputField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const ModalOtherTankParams = () => {
  return (
    <Box sx={style}>
      <InputField
        type='number'
        id='k_tk'
        label='K tanque'
        variant='outlined'
        name='k_tk'
        value={0}
        tooltipText='Coeficiente de '
      />
      <InputField
        type='number'
        id='k_aisl'
        label='K aislante'
        variant='outlined'
        name='k_aisl'
        value={0}
      />
      <InputField
        type='number'
        id='k_cub'
        label='K cub.'
        variant='outlined'
        name='k_cub'
        value={0}
      />
      <InputField
        type='number'
        id='h_int'
        label='h interior.'
        variant='outlined'
        name='h_int'
        value={0}
      />
      <InputField
        type='number'
        id='h_ext'
        label='h exterior'
        variant='outlined'
        name='h_ext'
        value={0}
      />
    </Box>
  );
};

export default ModalOtherTankParams;
