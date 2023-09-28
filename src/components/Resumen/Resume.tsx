import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  calculateAnnualEnergyTotal,
  findMinMaxEnergy,
} from '../../utils/energyUtils';

const Resume = () => {
  const {
    externalDiameter,
    internalDiameter,
    pipelineLength,
    granularity,
    pipelineSeparation,
    inclination,
    azimuth,
    currentRegister,
  } = useAppSelector(state => state.designer);
  const { currentLocation, date, manifoldLength, volumen, pipeNumber } =
    useAppSelector(state => state.locations);
  const minMax = findMinMaxEnergy(currentRegister);
  return (
    <Box className='bg-white p-4 rounded-lg shadow-md w-60'>
      <h3 className='text-xl font-medium mt-4 mb-2'>Resumen</h3>
      <p className='text-sm'>
        <span className='font-medium'>Energía anual tubo:</span>{' '}
        {calculateAnnualEnergyTotal(currentRegister).toFixed(2)} KW-h
      </p>
      <p className='text-sm'>
        <span className='font-medium'>Energía mínima tubo:</span>{' '}
        {minMax.min?.toFixed(2)} KW-h
      </p>
      <p className='text-sm'>
        <span className='font-medium'>Energía máxima tubo:</span>{' '}
        {minMax.max?.toFixed(2)} KW-h
      </p>
      <hr className='my-2' />
      <p className='text-sm'>
        <span className='font-medium'>Energía anual total:</span>{' '}
        {(
          calculateAnnualEnergyTotal(currentRegister) * (pipeNumber || 1)
        ).toFixed(2)}{' '}
        KW-h
      </p>
      <p className='text-sm'>
        <span className='font-medium'>Energía mínima total:</span>{' '}
        {(minMax.min! * (pipeNumber || 1)).toFixed(2)} KW-h
      </p>
      <p className='text-sm'>
        <span className='font-medium'>Energía máxima total:</span>{' '}
        {(minMax.max! * (pipeNumber || 1)).toFixed(2)} KW-h
      </p>
      <hr className='my-2' />
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
          {volumen?.toFixed(2)} m3
        </li>
      </ul>
    </Box>
  );
};

export default Resume;
