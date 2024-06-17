import { Box, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';
import Typography from '@mui/material/Typography';
import {
  calculateAnnualEnergyTotal,
  findMinMaxEnergy,
} from '../../utils/energyUtils';
import { generalStyles } from '../../styles/general';

const ResumeTheoretical = () => {
  const { currentRegister } = useAppSelector(state => state.designer);
  const { pipeNumber } = useAppSelector(state => state.locations);
  const minMax = findMinMaxEnergy(currentRegister);
  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Resultados
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <p className='text-sm'>
              <span className='font-medium'>Energía anual tubo:</span>{' '}
              {calculateAnnualEnergyTotal(currentRegister).toFixed(2)} KW-h
            </p>
            <p className='text-sm'>
              <span className='font-medium'>Energía mín. tubo:</span>{' '}
              {minMax.min?.toFixed(2)} KW-h
            </p>
            <p className='text-sm'>
              <span className='font-medium'>Energía máx. tubo:</span>{' '}
              {minMax.max?.toFixed(2)} KW-h
            </p>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <p className='text-sm'>
              <span className='font-medium'>Energía anual total:</span>{' '}
              {(
                calculateAnnualEnergyTotal(currentRegister) * (pipeNumber || 1)
              ).toFixed(2)}{' '}
              KW-h
            </p>
            <p className='text-sm'>
              <span className='font-medium'>Energía mín. total:</span>{' '}
              {(minMax.min! * (pipeNumber || 1)).toFixed(2)} KW-h
            </p>
            <p className='text-sm'>
              <span className='font-medium'>Energía máx. total:</span>{' '}
              {(minMax.max! * (pipeNumber || 1)).toFixed(2)} KW-h
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResumeTheoretical;
