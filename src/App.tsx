import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import trujilloData from './data/trujillo.csv';
import piuraData from './data/piura.csv';
import TableMUI from './components/table/TableMUI';
import LocalizationProviderWrapper from './components/utils/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SampleChart from './components/charts/SampleChart';
import dayjs from 'dayjs';

function filterByDateRange(data: any, from: string, to: string): any[] {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return data.filter((item: any) => {
    const date = new Date(item.PeriodStart);
    return date >= fromDate && date <= toDate;
  });
}

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [from, setFrom] = useState<string | null>();
  const [to, setTo] = useState<string | null>();
  const [place, setPlace] = React.useState<string>('none');

  const onDatepickerChange = (a: Dayjs | null) => {
    setFrom(a?.startOf('day').format());
    setTo(a?.endOf('day').format());
  };

  useEffect(() => {
    if (from && to) {
      let dataBase;
      if (place === 'trujillo') {
        dataBase = trujilloData;
      } else if (place === 'piura') {
        dataBase = piuraData;
      } else {
        dataBase = [];
      }
      setData(filterByDateRange(dataBase, from, to));
    }
  }, [from, to, place]);

  const handleChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
  };

  return (
    <div className='p-16'>
      <h3 className='text-3xl font-bold'>SOLARTHERM DESIGNER V0.001</h3>
      <Box sx={{ my: 4, display: 'flex', gap: '20px' }}>
        <FormControl>
          <InputLabel id='demo-simple-select-label'>Ciudad</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={place}
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
              defaultValue={dayjs(
                trujilloData[trujilloData.length - 1].PeriodStart.split('T')[0]
              )}
            />
          </LocalizationProviderWrapper>
        </div>
      </Box>
      {data.length > 0 && (
        <>
          <div className='w-full h-96'>
            <SampleChart data={data} />
          </div>

          <TableMUI rows={data} />
        </>
      )}
    </div>
  );
};

export default App;
