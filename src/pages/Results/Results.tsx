import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';
import { generalStyles } from '../../styles/general';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CustomLineChart from '../../components/Graphs/LineChart';
import { useAppSelector } from '../../hooks/reduxHooks';
import { capitalize } from '../../utils/textTransformations';

const Results = () => {
  const { data, city } = useAppSelector(state => state.designer);

  const [chart, setChart] = useState('power');

  const handleChangeChart = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setChart(newValue);
  };

  return (
    <div>
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
            label='Eficiencia vs tiempo'
            value='efficiency'
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

        <Box>
          {data.length > 0 && (
            <>
              {chart === 'efficiency' && (
                <CustomLineChart
                  data={data}
                  title={'Eficiencia vs Tiempo. Ciudad de ' + capitalize(city)}
                  columns={['Dhi', 'Dni', 'Ghi']}
                  domain={[0, 1000]}
                  size='medium'
                />
              )}

              {chart === 'power' && (
                <CustomLineChart
                  data={data}
                  title={'Potencia vs Tiempo. Ciudad de ' + capitalize(city)}
                  columns={['AirTemp']}
                  domain={[0, 40]}
                  size='medium'
                />
              )}
              {chart === 'energy' && (
                <CustomLineChart
                  data={data}
                  title={
                    'Energía acumulada vs Tiempo. Ciudad de ' + capitalize(city)
                  }
                  columns={['WindSpeed10m']}
                  domain={[0, 8]}
                  size='medium'
                />
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            marginTop: '35px',
          }}
        >
          <Button
            component={LinkRouter}
            variant='contained'
            to='/dashboard/designer'
          >
            Modificar parámetros
          </Button>
          <Button variant='contained'>Generar Reporte</Button>
          <Button
            component={LinkRouter}
            variant='contained'
            to='/dashboard/inspector'
          >
            Resultados tabulados
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Results;
