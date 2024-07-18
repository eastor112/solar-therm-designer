import * as React from 'react';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import TableBase from '../../components/Tables/TableBase';
import Box from '@mui/material/Box';

interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: any) => string;
}

interface TableMUIProps<T extends object> {
  rows: T[];
  title: string;
  maxHeight?: number;
}

function generateColumns<T extends object>(sampleRow: T): Column<T>[] {
  return Object.keys(sampleRow).map(key => ({
    id: key as keyof T,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
    minWidth: 100,
    align: 'center',
    format: (value: any) =>
      typeof value === 'number' ? value.toFixed(4) : String(value),
  }));
}

function GenerateRawDataInspector<T extends object>({
  rows,
  title,
  maxHeight,
}: TableMUIProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const columns = React.useMemo(() => {
    if (rows.length === 0) return [];
    return generateColumns(rows[0]);
  }, [rows]);

  return (
    <Box>
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
        maxHeight={maxHeight}
      />
    </Box>
  );
}

export default GenerateRawDataInspector;
