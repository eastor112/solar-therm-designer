import { useState } from 'react';
import TableBase from './TableBase';
import { IRegister, ProcessedData } from '../../types/registersTypes';
import { Paper, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general/index';

interface Column {
  id: keyof ProcessedData;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

// const columns: Column[] = [
//   {
//     id: 'day',
//     label: 'Día',
//     minWidth: 120,
//     align: 'center',
//     format: (value: number) => {
//       return dayjs.utc(value).local().format('DD-MM-YYYY HH:mm:ss');
//     },
//   },
//   {
//     id: 'energy',
//     label: 'Energía',
//     minWidth: 60,
//     align: 'center',
//     format: (value: number) => {
//       return value.toFixed(2);
//     },
//   },
// ];
const columns: Column[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'inclination_deg',
    label: 'Inclinación',
  },
  {
    id: 'azimuth_deg',
    label: 'Azimuth',
  },
  {
    id: 'granularity',
    label: 'Granularidad',
  },
  {
    id: 'pipeline_separation',
    label: 'Separación tubos (cm)',
  },
  {
    id: 'external_diameter',
    label: 'Diametro ext. (mm)',
  },
  {
    id: 'internal_diameter',
    label: 'Diametro int. (mm)',
  },
  {
    id: 'length',
    label: 'Long. tubo (m)',
  },
  {
    id: 'annualEnergy',
    label: 'Energía anual (KW-h)',
  },
];

interface ResultsTableProps {
  rows: IRegister[];
  title: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ rows, title }) => {
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

export default ResultsTable;
