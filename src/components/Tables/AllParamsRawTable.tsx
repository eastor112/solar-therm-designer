import { useState } from 'react';
import TableBase from './TableBase';
import { ProcessedData } from '../../types/registersTypes';
import { Paper, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general/index';
import { ParamsToExport } from '../../redux/testData';

interface Column {
  id: keyof ProcessedData;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

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
    label: 'Separación tubos (m)',
  },
  {
    id: 'external_diameter',
    label: 'Diametro ext. (m)',
  },
  {
    id: 'internal_diameter',
    label: 'Diametro int. (m)',
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
  rows: ParamsToExport[];
  title: string;
}

const AllParamsRawTable: React.FC<ResultsTableProps> = ({ rows, title }) => {
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

export default AllParamsRawTable;
