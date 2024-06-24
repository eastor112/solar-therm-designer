import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateProject } from '../../redux/locationsSlice';
// import { setModalComponent } from '../../redux/UISlice';
// import { getModalSelector } from './getModalSelector';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const ModalConfirmDiscard = () => {
  const dispatch = useAppDispatch();
  const { nextModalAction } = useAppSelector(state => state.locations);

  const handleSaveAndContinue = () => {
    dispatch(updateProject({ closeOnFinish: false }));
    if (nextModalAction) {
      // dispatch(setModalComponent(getModalSelector[nextModalAction]));
    }
  };

  const handleDiscardAndContinue = () => {
    if (nextModalAction) {
      // dispatch(setModalComponent(getModalSelector[nextModalAction]));
    }
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
        Confirmación Requerida
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
          Existen cambios sin guardar. ¿Desea guardarlos antes de continuar?
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
              whiteSpace: 'nowrap',
            }}
            onClick={handleDiscardAndContinue}
          >
            No guardar
          </Button>
          <Button
            variant='contained'
            sx={{
              width: '9rem',
            }}
            onClick={handleSaveAndContinue}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalConfirmDiscard;
