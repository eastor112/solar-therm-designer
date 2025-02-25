import * as React from 'react';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import { IWeather } from '../../types/locationstypes';
import TableBase from './TableBase';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Column {
  id:
    | 'temperature'
    | 'clearsky_dhi'
    | 'clearsky_dni'
    | 'clearsky_ghi'
    | 'dhi'
    | 'dni'
    | 'ghi'
    | 'cloud_type'
    | 'relative_humidity'
    | 'solar_zenith_angle'
    | 'wind_direction'
    | 'wind_speed'
    | 'location_id'
    | 'date';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'date',
    label: 'Tiempo',
    minWidth: 120,
    align: 'center',
    format: (value: number) => {
      return dayjs.utc(value).local().format('DD-MM-YYYY HH:mm:ss');
    },
  },
  {
    id: 'temperature',
    label: 'Temp.',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'dhi',
    label: 'Dhi',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'dni',
    label: 'Dni',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'ghi',
    label: 'Ghi',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'clearsky_dhi',
    label: 'Dhi despejado',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'clearsky_dni',
    label: 'Dni despejado',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'clearsky_ghi',
    label: 'Ghi despejado',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'cloud_type',
    label: 'Tipo nubosidad',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'relative_humidity',
    label: 'Humedad rel.',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'solar_zenith_angle',
    label: 'Áng. solar',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'wind_direction',
    label: 'Dir.  viento',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'wind_speed',
    label: 'Vel. viento',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
];

interface TableMUIProps {
  rows: IWeather[];
  title: string;
}

const TableMUI: React.FC<TableMUIProps> = ({ rows, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  return (
    <Paper>
      <Typography
        variant='h3'
        sx={{ ...generalStyles.h3, textAlign: 'center', pt: 2 }}
      >
        {title}
      </Typography>
      <TableBase
        rows={rows}
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Paper>
  );
};

export default TableMUI;
