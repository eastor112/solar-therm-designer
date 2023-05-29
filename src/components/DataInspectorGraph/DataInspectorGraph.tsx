import React from 'react';
import Box from '@mui/material/Box';
import SampleChart from '../../components/Graphs/SampleChart';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WindPowerIcon from '@mui/icons-material/WindPower';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { generalStyles } from '../../styles/general';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const capitalize = (cadena: string) => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};

export interface DataGraphProps {
  city: string;
  data: any[];
  chart: string;
  handleChangeChart: (_event: React.SyntheticEvent, newValue: string) => void;
  showGraph: boolean;
}

const DataInspectorGraph: React.FC<DataGraphProps> = ({
  city,
  data,
  chart,
  handleChangeChart,
  showGraph,
}) => {
  const navigate = useNavigate();

  const handleShowRawData = () => {
    navigate('/dashboard/inspector');
  };

  return (
    <Box
      sx={{
        ...generalStyles.cardLayout,
        width: '100%',
      }}
    >
      <Typography variant='h3' sx={generalStyles.h3}>
        Inspección de datos
      </Typography>

      <Box
        sx={{
          display: 'flex',
          height: '420px',
          width: '100%',
        }}
      >
        {showGraph ? (
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Box>
              {data.length > 0 && (
                <>
                  {chart === 'radiation' && (
                    <SampleChart
                      data={data}
                      title={
                        'Radiación vs Tiempo. Ciudad de ' + capitalize(city)
                      }
                      columns={['Dhi', 'Dni', 'Ghi']}
                      domain={[0, 1000]}
                    />
                  )}

                  {chart === 'temperature' && (
                    <SampleChart
                      data={data}
                      title={
                        'Temperatura del aire vs Tiempo. Ciudad de ' +
                        capitalize(city)
                      }
                      columns={['AirTemp']}
                      domain={[0, 40]}
                    />
                  )}
                  {chart === 'windSpeed' && (
                    <SampleChart
                      data={data}
                      title={
                        'Velocidad del viento [10m] vs Tiempo. Ciudad de ' +
                        capitalize(city)
                      }
                      columns={['WindSpeed10m']}
                      domain={[0, 8]}
                    />
                  )}
                </>
              )}
            </Box>
          </Box>
        ) : (
          <div className='flex-1'></div>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '120px',
            gap: 10,
            justifyContent: 'space-between',
          }}
        >
          <BottomNavigation
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: 1,
              justifyContent: 'space-between',
            }}
            value={chart}
            onChange={handleChangeChart}
          >
            <BottomNavigationAction
              label='Temperatura'
              value='temperature'
              icon={<DeviceThermostatIcon />}
              showLabel={true}
              sx={{
                height: '80px',
                paddingY: '10px',
                border: '1px solid #ddd',
              }}
              className='h-20'
            />
            <BottomNavigationAction
              label='Radiación'
              value='radiation'
              icon={<MultilineChartIcon />}
              showLabel={true}
              sx={{
                height: '80px',
                paddingY: '10px',
                border: '1px solid #ddd',
              }}
            />
            <BottomNavigationAction
              label='Vel. viento'
              value='windSpeed'
              icon={<WindPowerIcon />}
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
              textAlign: 'center',
            }}
          >
            <Button variant='contained' onClick={handleShowRawData}>
              Datos tabulados
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DataInspectorGraph;
