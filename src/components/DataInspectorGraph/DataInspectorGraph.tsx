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

const capitalize = (cadena: string) => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};

export interface DataGraphProps {
  city: string;
  data: any[];
  chart: string;
  handleChangeChart: (_event: React.SyntheticEvent, newValue: string) => void;
}

const DataInspectorGraph: React.FC<DataGraphProps> = ({
  city,
  data,
  chart,
  handleChangeChart,
}) => {
  return (
    <Box
      sx={{
        ...generalStyles.cardLayout,
        width: '100%',
        display: 'flex',
      }}
    >
      {/* <Box sx={{ my: 4, display: 'flex', gap: '20px' }}>
        <FormControl>
          <InputLabel id='demo-simple-select-label'>Ciudad</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={city}
            label='Ciudad'
            onChange={handleChange}
          >
            <MenuItem value={'none'}>ninguna</MenuItem>
            <MenuItem value={'trujillo'}>Trujillo</MenuItem>
            <MenuItem value={'piura'}>Piura</MenuItem>
          </Select>
        </FormControl>

        <div>
          <LocalizationProviderWrapper>
            <DatePicker
              onChange={onDatepickerChange}
              minDate={dayjs(trujilloData[0].PeriodStart.split('T')[0])}
              maxDate={dayjs(
                trujilloData[trujilloData.length - 1].PeriodStart.split('T')[0]
              )}
              defaultValue={defaultDateValue}
              label='From'
            />
          </LocalizationProviderWrapper>
        </div>

        <Button
          component={LinkRouter}
          variant='contained'
          color='primary'
          to='/results'
        >
          Calcular
        </Button>
        <Button
          component={LinkRouter}
          variant='contained'
          color='primary'
          to='/login'
        >
          Logout
        </Button>
      </Box> */}
      <BottomNavigation
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          marginY: 2,
          width: '120px',
          gap: 1,
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
          flex: 1,
        }}
      >
        <Box>
          {data.length > 0 && (
            <>
              {chart === 'radiation' && (
                <SampleChart
                  data={data}
                  title={'Radiación vs Tiempo. Ciudad de ' + capitalize(city)}
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
              {/* <TableMUI rows={data} /> */}
            </>
          )}
        </Box>
        <Box>
          <Button variant='contained'>Ver datos sin formato</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DataInspectorGraph;
