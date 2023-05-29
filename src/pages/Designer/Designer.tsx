import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import trujilloData from '../../data/trujillo.csv';
import piuraData from '../../data/piura.csv';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import DesignerForm from '../../components/DesignerForm/DesignerForm';
import DataInspectorGraph from '../../components/DataInspectorGraph/DataInspectorGraph';
import { useOutletContexRoot } from '../RootLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setData, setDate } from '../../redux/designerSlice';
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
  const { data, city } = useAppSelector(state => state.designer);
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useOutletContexRoot();

  const [from, setFrom] = useState<string | undefined>(
    defaultDateValue.startOf('day').format()
  );
  const [to, setTo] = useState<string | undefined>(
    defaultDateValue.endOf('day').format()
  );

  const [chart, setChart] = useState('temperature');
  const [showGraph, setShowGraph] = useState(true);

  useEffect(() => {
    dispatch(setDate(defaultDateValue.format('DD/MM/YYYY')));
    return () => {};
  }, []);

  useEffect(() => {
    setShowGraph(false);
    setTimeout(() => {
      setShowGraph(true);
    }, 500);
  }, [isSidebarOpen]);

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

      dispatch(setData(filterByDateRange(dataBase, from, to)));
    }
  }, [from, to, city]);

  return (
    <>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <div className='flex flex-col gap-8'>
          <h3 className='text-3xl font-bold'>SOLARTHERM DESIGNER V0.020</h3>
          <div className='flex gap-8'>
            <ZoneInformation />

            <DesignerForm />
          </div>
          <DataInspectorGraph
            city={city!}
            data={data}
            chart={chart}
            handleChangeChart={handleChangeChart}
            showGraph={showGraph}
          />
        </div>
      </Box>
    </>
  );
};

export default Designer;
