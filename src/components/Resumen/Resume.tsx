import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';

const Resume = () => {
  const {
    externalDiameter,
    internalDiameter,
    pipelineLength,
    granularity,
    pipelineSeparation,
    inclination,
    azimuth,
  } = useAppSelector(state => state.designer);
  const { currentLocation, date, manifoldLength } = useAppSelector(
    state => state.locations
  );
  return (
    <Box
      sx={{
        width: '220px',
      }}
    >
      <h3 className='text-xl font-medium mt-7'>Resumen</h3>
      <ul className='my-2'>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Ubicación:</span>{' '}
          {currentLocation?.place}
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Fecha:</span> {date}
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Latitud:</span>{' '}
          {currentLocation?.lat}°
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Longitud:</span>{' '}
          {currentLocation?.lng}°
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Altitud:</span>{' '}
          {currentLocation?.altitude} m
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Diámetro exterior:</span>{' '}
          {externalDiameter} mm
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Diámetro interior:</span>{' '}
          {internalDiameter} mm
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Longitud tubo:</span>{' '}
          {pipelineLength} m
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Longitud Manifold:</span>{' '}
          {pipelineLength} m
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Granularidad:</span> {granularity}{' '}
          puntos/día
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Separación tubos:</span>{' '}
          {pipelineSeparation} m
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Número tubos:</span>{' '}
          {manifoldLength}
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Inclinación:</span> {inclination}°
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Azimuth:</span>{' '}
          {azimuth.toFixed(2)}°
        </li>
        <li className='text-sm'>
          <span className='font-medium mr-1'>Volumen:</span>{' '}
          {azimuth.toFixed(2)}°
        </li>
      </ul>
    </Box>
  );
};

export default Resume;
