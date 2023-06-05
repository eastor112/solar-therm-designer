import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalNewProject = () => {
  return (
    <Box sx={style}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Crear nuevo proyecto
      </Typography>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
        voluptatibus quibusdam ratione ipsa libero minus optio corrupti! Non,
        et. Beatae enim culpa earum debitis ipsa optio fugit atque, suscipit
        similique.
      </Typography>
    </Box>
  );
};

export default ModalNewProject;
