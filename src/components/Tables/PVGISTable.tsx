import dayjs from 'dayjs';
import { useState } from 'react';
import TableBase from './TableBase';
import { Paper, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general/index';

interface Column {
  id: 'time' | 'G(i)' | 'H_sun' | 'T2m' | 'WS10m' | 'Int';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'time',
    label: 'Fecha',
    minWidth: 120,
    align: 'center',
    format: (value: number) => {
      return dayjs.utc(value).local().format('DD-MM-YYYY HH:mm:ss');
    },
  },
  {
    id: 'G(i)',
    label: 'G(i)',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'H_sun',
    label: 'H_sun',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'T2m',
    label: 'T2m',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'WS10m',
    label: 'WS10m',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    id: 'Int',
    label: 'Int',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
];

interface ResultsTableProps {
  rows: any[];
  title: string;
}

const PVGISTable: React.FC<ResultsTableProps> = ({ rows, title }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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

export default PVGISTable;
