import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { generalStyles } from '../../styles/general';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CustomLineChart from '../../components/Graphs/LineChart';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { capitalize } from '../../utils/textTransformations';
import {
  getRegisters,
  setDataType,
  setReturnRoute,
} from '../../redux/designerSlice';
import Resume from '../../components/Resumen/Resume';
import { extractEnergyKeys, transformData } from '../../redux/testData';

const Results = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { date } = useAppSelector(state => state.locations);
  const { data, city, currentRegister, registers } = useAppSelector(
    state => state.designer
  );
  const [chart, setChart] = useState('annualEnergy');

  useEffect(() => {
    if (currentRegister.length === 0) {
      navigate('/dashboard/designer');
    }
  }, []);

  const handleChangeChart = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    if (newValue === 'annualEnergyComparison' && registers.length === 0) {
      dispatch(getRegisters());
    }
    setChart(newValue);
  };

  return (
    <Box>
      <h3 className='text-3xl font-bold mb-8'>SOLARTHERM DESIGNER V0.020</h3>
      <Box sx={{ ...generalStyles.cardLayout, minWidth: 380, flex: 1 }}>
        <Typography variant='h3' sx={generalStyles.h3}>
          Resultados
        </Typography>

        <BottomNavigation
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'left',
            gap: 1,
          }}
          value={chart}
          onChange={handleChangeChart}
        >
          <BottomNavigationAction
            label='Energía anual'
            value='annualEnergy'
            showLabel={true}
            sx={{
              height: '80px',
              paddingY: '10px',
              border: '1px solid #ddd',
            }}
            className='h-20'
          />

          <BottomNavigationAction
            label='Eficiencia anual (Comparación)'
            value='annualEnergyComparison'
            showLabel={true}
            sx={{
              height: '80px',
              paddingY: '10px',
              border: '1px solid #ddd',
            }}
            className='h-20'
          />
          <BottomNavigationAction
            label='Potencia vs tiempo'
            value='power'
            showLabel={true}
            sx={{
              height: '80px',
              paddingY: '10px',
              border: '1px solid #ddd',
            }}
          />
          <BottomNavigationAction
            label='Energía acumulada vs tiempo'
            value='energy'
            showLabel={true}
            sx={{
              height: '80px',
              paddingY: '10px',
              border: '1px solid #ddd',
            }}
          />
        </BottomNavigation>

        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* <EnhancedTable /> */}

            <Box sx={{ mt: '20px' }}>
              {data.length > 0 ||
                (currentRegister.length > 0 && (
                  <>
                    {chart === 'annualEnergy' && (
                      <CustomLineChart
                        data={currentRegister}
                        title={'Enegía teórica anual en ' + capitalize(city)}
                        columns={['energy']}
                        domain={[0, 0.8]}
                        size='medium'
                        dataKey='day'
                        date={date ? date : undefined}
                        units='[KW-h]'
                        interval={14}
                      />
                    )}

                    {chart === 'annualEnergyComparison' && (
                      <CustomLineChart
                        data={transformData(registers)}
                        title={
                          'Energía teórica anual con diferentes diseños. Ciudad de ' +
                          capitalize(city)
                        }
                        columns={extractEnergyKeys(registers)}
                        domain={[0, 1.1]}
                        size='medium'
                        dataKey='day'
                        units='[KW-h]'
                        legendDirection='horizontal'
                      />
                    )}

                    {chart === 'power' && (
                      <CustomLineChart
                        data={data}
                        title={
                          'Potencia vs Tiempo. Ciudad de ' + capitalize(city)
                        }
                        columns={['AirTemp']}
                        domain={[0, 40]}
                        size='medium'
                        dataKey='date'
                      />
                    )}
                    {chart === 'energy' && (
                      <CustomLineChart
                        data={data}
                        title={
                          'Energía acumulada vs Tiempo. Ciudad de ' +
                          capitalize(city)
                        }
                        columns={['WindSpeed10m']}
                        domain={[0, 8]}
                        size='medium'
                        dataKey='date'
                      />
                    )}
                  </>
                ))}
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                marginTop: '40px',
              }}
            >
              <Button
                component={LinkRouter}
                variant='contained'
                to='/dashboard/designer'
              >
                Modificar parámetros
              </Button>
              <Button
                component={LinkRouter}
                variant='contained'
                to='/dashboard/inspector'
                onClick={() => {
                  dispatch(setDataType('energy'));
                  dispatch(setReturnRoute('/dashboard/results'));
                }}
              >
                Resultados tabulados
              </Button>
            </Box>
            <Resume />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Results;
