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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

function filterByDateRange(data: any, from: string, to: string): any[] {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return data.filter((item: any) => {
    const date = new Date(item.PeriodStart);
    return date >= fromDate && date <= toDate;
  });
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  // @ts-ignore
  const onDatepickerChange = (a: Dayjs | null) => {
    setFrom(a?.startOf('day').format());
    setTo(a?.endOf('day').format());
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <ZoneInformation handleOpen={handleOpen} />

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Seleccionar lugar
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Seleccione el lugar de estudio o ingrese coordenadas
          </Typography>
          <FormControl
            fullWidth
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <InputLabel id='demo-simple-select-label'>Ciudad</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              // value={age}
              label='Ciudad'
              // onChange={handleChange}
            >
              <MenuItem value={0}>Ninguna</MenuItem>
              <MenuItem value={10}>Piura</MenuItem>
              <MenuItem value={20}>Trujillo</MenuItem>
            </Select>

            <TextField
              type='number'
              id='outlined-basic'
              label='Latitud'
              variant='outlined'
              disabled
            />
            <TextField
              type='number'
              id='outlined-basic'
              label='Longitud'
              variant='outlined'
              disabled
            />

            <Button variant='contained'>Cambiar</Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default Designer;
