import dayjs from 'dayjs';
import { useState } from 'react';
import TableBase from './TableBase';
import { IRegister } from '../../types/registersTypes';
import { Paper, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general/index';

interface Column {
  id: 'day' | 'energy';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'day',
    label: 'Día',
    minWidth: 120,
    align: 'center',
    format: (value: number) => {
      return dayjs.utc(value).local().format('DD-MM-YYYY HH:mm:ss');
    },
  },
  {
    id: 'energy',
    label: 'Energía',
    minWidth: 60,
    align: 'center',
    format: (value: number) => {
      return value.toFixed(2);
    },
  },
];

interface ResultsTableProps {
  rows: IRegister[];
  title: string;
}

const ResultsRawTable: React.FC<ResultsTableProps> = ({ rows, title }) => {
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

export default ResultsRawTable;
