import { useState } from 'react';
import TableBase from './TableBase';
import { Box, Paper, Typography } from '@mui/material';
import { generalStyles } from '../../styles/general/index';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

interface ResultsTableProps {
  rows: any;
  title: string;
}

const getColums = (data: any) => {
  const columns: Column[] = [];

  Object.keys(data).forEach(key => {
    columns.push({
      id: key,
      label: key,
      format: value => {
        if (key !== 'day') {
          return value.toFixed(6);
        }
        return value.toString();
      },
    });
  });

  return columns;
};

const AllResultsRawTable: React.FC<ResultsTableProps> = ({ rows, title }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const dynamicColumns = getColums(rows[0]);

  return (
    <Paper>
      <Typography
        variant='h3'
        sx={{ ...generalStyles.h3, textAlign: 'center', pt: 2 }}
      >
        {title}
      </Typography>
      <Box sx={{ p: '20px' }}>
        <TableBase
          rows={rows}
          columns={dynamicColumns}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

export default AllResultsRawTable;
