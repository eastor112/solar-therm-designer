import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setOpenModal } from '../../redux/UISlice';

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

const ModalNewProject = () => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setOpenModal(false));
  };

  return (
    <Box sx={style}>
      <Typography
        sx={{
          mb: 3,
        }}
        id='modal-modal-title'
        variant='h6'
        component='h2'
      >
        Crear nuevo proyecto
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField id='name' label='nombre de proyecto' variant='outlined' />
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          <Button
            variant='outlined'
            sx={{
              width: '7rem',
            }}
            onClick={handleClose}
          >
            cancelar
          </Button>
          <Button
            variant='contained'
            sx={{
              width: '7rem',
            }}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalNewProject;
