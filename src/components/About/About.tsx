import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const About = () => {
  return (
    <Box
      component={'p'}
      sx={{
        width: '100%',
        whiteSpace: 'normal',
        overflow: 'hidden',
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
      }}
    >
      <Typography sx={{ fontSize: '12px' }}>
        Software de diseño de termas solares elaborado en la Escuela de
        Ingeniería Mecatrónica de la Universidad Nacional de Trujillo en
        colaboración con la Universidad de Piura, como parte del proyecto de
        “Diseño de termas solares con tubos al vacío”. El equipo de trabajo fue
        conformado por... ver mas
      </Typography>
    </Box>
  );
};

export default About;
