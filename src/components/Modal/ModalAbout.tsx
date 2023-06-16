import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import mecatronicaLogo from '../../assets/mecatronica-logo.png';
import untLogo from '../../assets/unt-logo.png';
import { Button } from '@mui/material';
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

const ModalAbout = () => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setOpenModal(false));
  };
  return (
    <Box sx={style}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <img src={untLogo} alt='logo unt' width={140} />
        <img src={mecatronicaLogo} alt='logo mecatronica' width={100} />
      </Box>
      <Typography id='modal-modal-description' sx={{ mt: 2, fontSize: 13 }}>
        Software de diseño de termas solares elaborado en la Escuela de
        Ingeniería Mecatrónica de la Universidad Nacional de Trujillo (UNT) en
        colaboración con la Universidad de Piura (UDEP), como parte del proyecto
        de “Desarrollo de metodología para el diseño térmico de termas solares
        de tubos al vacío de alta eficiencia bajo restricciones latitudinales y
        climáticas del Perú”
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant='outlined' onClick={handleClose}>
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};

export default ModalAbout;
