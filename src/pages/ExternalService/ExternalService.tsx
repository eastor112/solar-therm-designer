import MapLeafleat from '../../components/MapLeafleat/MapLeafleat';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getWeatherPVGISData } from '../../services/weatherServices';
import Button from '@mui/material/Button';
import { HourlyElement } from '../../types/locationstypes';
import { transformToDayjs } from '../../utils/datesUtils';
import CustomLineChart from '../../components/Graphs/LineChart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from '../../utils/datesUtils';

const years = [
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
];

const decimals = 5;
const defaultCoordinates = {
  lat: -8.11599,
  lon: -79.02998,
};

const ExternalService = () => {
  const [year, setYear] = useState('2020');
  const [angle, setAngle] = useState(0);
  const [azimuth, setAzimuth] = useState(0);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  }>(defaultCoordinates);
  const [hourlyData, setHourlyData] = useState<HourlyElement[]>([]);
  const [hourlyDataFromDay, setHourlyDataFromDay] = useState<HourlyElement[]>(
    []
  );

  const handleChange = (event: any) => {
    setYear(event.target.value);
  };

  const onGetData = async () => {
    if (coordinates?.lat && coordinates.lon) {
      const data = await getWeatherPVGISData({
        lat: coordinates?.lat,
        lon: coordinates?.lon,
        year,
        angle,
        azimuth,
      });
      const transformed = data.outputs.hourly.map(reg => ({
        ...reg,
        time: transformToDayjs(reg.time).format('YYYY-MM-DDTHH:mm'),
      }));
      setHourlyData(transformed);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          bgcolor: 'background.paper',
          mt: 2,
          borderRadius: 1,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id='year-select-label'>Año</InputLabel>
          <Select
            labelId='year-select-label'
            id='year-select'
            value={year}
            label='Año'
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 150,
                },
              },
            }}
          >
            {years.map(year => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Angle */}
        <FormControl fullWidth>
          <TextField
            type='number'
            label='Inclinación (Grados°)'
            variant='outlined'
            name='angle'
            value={angle}
            sx={{
              width: '100%',
            }}
            onChange={e => {
              setAngle(+e.target.value);
            }}
          />
        </FormControl>

        {/* Azimuth */}
        <FormControl fullWidth>
          <TextField
            type='number'
            label='Azimuth (Grados°)'
            variant='outlined'
            name='azimuth'
            value={azimuth}
            sx={{
              width: '100%',
            }}
            onChange={e => {
              setAzimuth(+e.target.value);
            }}
          />
        </FormControl>

        <Button variant='contained' onClick={onGetData}>
          Obtener datos
        </Button>
        <MapLeafleat
          defaultCoordinates={defaultCoordinates}
          onMarkerClick={(lat, lon) => {
            setCoordinates({
              lat: +lat.toFixed(decimals),
              lon: +lon.toFixed(decimals),
            });
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          bgcolor: 'background.paper',
          mt: 2,
          borderRadius: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Basic date picker'
            maxDate={dayjs('2020-12-31')}
            onChange={day => {
              if (day) {
                const filtered = hourlyData.filter(record =>
                  record.time.startsWith(day.format('YYYY-MM-DD'))
                );
                setHourlyDataFromDay(filtered);
              }
            }}
          />
        </LocalizationProvider>

        {hourlyDataFromDay.length ? (
          <CustomLineChart
            data={hourlyDataFromDay}
            title={'Radiación vs Tiempo'}
            // columns={['G(i)', 'H_sun', 'T2m', 'WS10m']}
            columns={['G(i)']}
            domain={[0, 1000]}
            units='[W/m2]'
            dataKey='time'
          />
        ) : null}
      </Box>
    </div>
  );
};

export default ExternalService;
