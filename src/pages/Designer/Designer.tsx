import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import trujilloData from '../../data/trujillo.csv';
import piuraData from '../../data/piura.csv';
import TableMUI from '../../components/Tables/TableMUI';
import LocalizationProviderWrapper from '../../utils/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SampleChart from '../../components/Graphs/SampleChart';
import dayjs from 'dayjs';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WindPowerIcon from '@mui/icons-material/WindPower';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { Link as LinkRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import { TextField, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general';

function filterByDateRange(data: any, from: string, to: string): any[] {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return data.filter((item: any) => {
    const date = new Date(item.PeriodStart);
    return date >= fromDate && date <= toDate;
  });
}

const capitalize = (cadena: string) => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};

const defaultDateValue = dayjs(
  trujilloData[trujilloData.length - 1].PeriodStart.split('T')[0]
);

const Designer = () => {
  const [data, setData] = useState<any[]>([]);
  const [from, setFrom] = useState<string | undefined>(
    defaultDateValue.startOf('day').format()
  );
  const [to, setTo] = useState<string | undefined>(
    defaultDateValue.endOf('day').format()
  );
  const [city, setCity] = useState<string>('none');
  const [chart, setChart] = useState('temperature');

  const handleChangeChart = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setChart(newValue);
  };

  const onDatepickerChange = (a: Dayjs | null) => {
    setFrom(a?.startOf('day').format());
    setTo(a?.endOf('day').format());
  };

  useEffect(() => {
    if (from && to) {
      let dataBase;
      if (city === 'trujillo') {
        dataBase = trujilloData;
      } else if (city === 'piura') {
        dataBase = piuraData;
      } else {
        dataBase = [];
      }
      setData(filterByDateRange(dataBase, from, to));
    }
  }, [from, to, city]);

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <main className='bg-gray-200'>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <div className='pt-20 px-10 w-full'>
          <h3 className='text-3xl font-bold pb-5'>
            SOLARTHERM DESIGNER V0.017
          </h3>
          <div className='flex gap-20'>
            <ZoneInformation />
            <Box sx={{ ...generalStyles.cardLayout, flex: 1 }}>
              <Typography variant='h3' sx={generalStyles.h3}>
                Parámetros
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                <div className='flex flex-col flex-1 gap-6'>
                  <TextField
                    id='outlined-basic'
                    label='Volumen'
                    variant='outlined'
                  />
                  <TextField
                    id='outlined-basic'
                    label='Longitud de Manifold'
                    variant='outlined'
                  />
                  <TextField
                    id='outlined-basic'
                    label='Número de tubos'
                    variant='outlined'
                  />
                </div>
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel id='pipe-type-label'>Tipo de tubería</InputLabel>
                  <Select
                    labelId='pipe-type-label'
                    id='pipe-type'
                    value={'1'}
                    label='Tipo de tubería'
                    sx={{
                      width: '100%',
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={'1'}>Tipo 1</MenuItem>
                    <MenuItem value={'2'}>Tipo 2</MenuItem>
                    <MenuItem value={'3'}>Tipo 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Button variant='contained' sx={{ px: 10 }}>
                  CALCULAR
                </Button>
              </Box>
            </Box>
          </div>
          <div>
            <Box sx={{ my: 4, display: 'flex', gap: '20px' }}>
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
                      trujilloData[trujilloData.length - 1].PeriodStart.split(
                        'T'
                      )[0]
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
            </Box>
            <Box>
              <BottomNavigation
                sx={{ width: 500 }}
                value={chart}
                onChange={handleChangeChart}
              >
                <BottomNavigationAction
                  label='Temperatura'
                  value='temperature'
                  icon={<DeviceThermostatIcon />}
                />
                <BottomNavigationAction
                  label='Radiación'
                  value='radiation'
                  icon={<MultilineChartIcon />}
                />
                <BottomNavigationAction
                  label='Velocidad del viento'
                  value='windSpeed'
                  icon={<WindPowerIcon />}
                />
              </BottomNavigation>
            </Box>

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
                <TableMUI rows={data} />
              </>
            )}
          </div>
        </div>
      </Box>
    </main>
  );
};

export default Designer;
