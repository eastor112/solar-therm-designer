import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import trujilloData from '../../data/trujillo.csv';
import piuraData from '../../data/piura.csv';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import Sidebar from '../../components/Sidebar/Sidebar';
import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import DesignerForm from '../../components/DesignerForm/DesignerForm';
import DataInspectorGraph from '../../components/DataInspectorGraph/DataInspectorGraph';
function filterByDateRange(data: any, from: string, to: string): any[] {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return data.filter((item: any) => {
    const date = new Date(item.PeriodStart);
    return date >= fromDate && date <= toDate;
  });
}

const defaultDateValue = dayjs(
  trujilloData[trujilloData.length - 1].PeriodStart.split('T')[0]
).subtract(1, 'day');

const Designer = () => {
  const [data, setData] = useState<any[]>([]);
  const [from, setFrom] = useState<string | undefined>(
    defaultDateValue.startOf('day').format()
  );
  const [to, setTo] = useState<string | undefined>(
    defaultDateValue.endOf('day').format()
  );
  const [city, setCity] = useState<string>('piura');
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
    <>
      <Box
        sx={{
          minHeight: '100vh',
          paddingY: 4,
          width: '100%',
          flex: 1,
        }}
      >
        <div className='px-10 flex flex-col gap-8'>
          <h3 className='text-3xl font-bold'>SOLARTHERM DESIGNER V0.017</h3>
          <div className='flex gap-8'>
            <ZoneInformation />

            <DesignerForm />
          </div>
          <DataInspectorGraph
            city={city}
            data={data}
            chart={chart}
            handleChangeChart={handleChangeChart}
          />
        </div>
      </Box>
    </>
  );
};

export default Designer;
