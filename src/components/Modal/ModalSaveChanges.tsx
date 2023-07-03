import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setOpenModal } from '../../redux/UISlice';
import { updateProject } from '../../redux/locationsSlice';

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

const ModalSaveChanges = () => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setOpenModal(false));
  };

  const handleSave = () => {
    dispatch(updateProject());
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
        Cofirmacion Requerida
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography
          sx={{
            mb: 1,
          }}
          id='modal-modal-title'
          component='h2'
        >
          Se guardarán todas las configuraciones realizadas en el presente
          proyecto. Si ya tenia una version guardada se sobreescribirá.
        </Typography>

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
            Cancelar
          </Button>
          <Button
            variant='contained'
            sx={{
              width: '7rem',
            }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalSaveChanges;
