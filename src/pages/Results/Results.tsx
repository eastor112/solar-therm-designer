import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generalStyles } from '../../styles/general';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useAppSelector } from '../../hooks/reduxHooks';
import TheoricalComparison from '../../components/ResultsPartials/TheoricalComparison';
import { useOutletContexRoot } from '../RootLayout';
import { useGraphVisibility } from '../../hooks/useGraphVisibility';
import TheoricalResults from '../../components/ResultsPartials/TheoricalResults';

const Results = () => {
  const navigate = useNavigate();
  const { data, currentRegister } = useAppSelector(state => state.designer);
  const [chart, setChart] = useState('annualEnergy');
  const { isSidebarOpen } = useOutletContexRoot();
  const showGraph = useGraphVisibility(isSidebarOpen);

  useEffect(() => {
    if (currentRegister.length === 0) {
      navigate('/dashboard/designer');
    }
  }, []);

  const handleChangeChart = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setChart(newValue);
  };

  return (
    <Box>
      <h3 className='text-3xl font-bold mb-8'>SOLARTHERM DESIGNER</h3>
      <Box
        sx={{
          ...generalStyles.cardLayout,
          minWidth: 380,
          flex: 1,
          maxWidth: isSidebarOpen ? '82vw' : '95vw',
        }}
      >
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
          {/* <BottomNavigationAction
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
          /> */}
        </BottomNavigation>

        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mt: '20px' }}>
              {data.length > 0 ||
                (currentRegister.length > 0 && (
                  <>
                    {chart === 'annualEnergy' && (
                      <TheoricalResults showGraph={showGraph} />
                    )}

                    {chart === 'annualEnergyComparison' && (
                      <TheoricalComparison showGraph={showGraph} />
                    )}

                    {/* {chart === 'power' && (
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
                    )} */}
                  </>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Results;
