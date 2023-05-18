import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';

const Results = () => {
  return (
    <div className='p-6'>
      <h3>Results</h3>
      <p>Página en desarrollo</p>
      <Button
        component={LinkRouter}
        variant='contained'
        color='primary'
        to='/designer'
      >
        Diseño
      </Button>
    </div>
  );
};

export default Results;
