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
      <InputField />
    </Box>
  );
};

export default ModalOtherTankParams;
