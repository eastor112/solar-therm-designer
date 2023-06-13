import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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

const ModalReports = () => {
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
        Descargar Reporte
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          id='name'
          label='nombre de proyecto'
          variant='outlined'
          value='Modelo1 - Trujillo - Elder.pdf'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant='contained'>Descargar</Button>
      </Box>
    </Box>
  );
};

export default ModalReports;
