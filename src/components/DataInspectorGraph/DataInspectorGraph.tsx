import React from 'react';
import Box from '@mui/material/Box';
import CustomLineChart from '../Graphs/LineChart';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WindPowerIcon from '@mui/icons-material/WindPower';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { generalStyles } from '../../styles/general';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { IWeather } from '../../types/locationstypes';
import { useDispatch } from 'react-redux';
import { setDataType } from '../../redux/designerSlice';

const capitalize = (value: string | null) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export interface DataGraphProps {
  city: string;
  data: IWeather[];
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowRawData = () => {
    dispatch(setDataType('weather'));
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
                    <CustomLineChart
                      data={data}
                      title={
                        'Radiación vs Tiempo. Ciudad de ' + capitalize(city)
                      }
                      columns={['dhi', 'dni', 'ghi']}
                      domain={[0, 1000]}
                      units='[W/m2]'
                      dataKey='date'
                    />
                  )}

                  {chart === 'temperature' && (
                    <CustomLineChart
                      data={data}
                      title={
                        'Temperatura del aire vs Tiempo. Ciudad de ' +
                        capitalize(city)
                      }
                      columns={['temperature']}
                      domain={[0, 40]}
                      units='[°C]'
                      dataKey='date'
                    />
                  )}
                  {chart === 'windSpeed' && (
                    <CustomLineChart
                      data={data}
                      title={
                        'Velocidad del viento [10m] vs Tiempo. Ciudad de ' +
                        capitalize(city)
                      }
                      columns={['wind_speed']}
                      domain={[0, 8]}
                      units='[m/s]'
                      dataKey='date'
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
