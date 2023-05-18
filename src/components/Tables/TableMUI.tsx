import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Load Day.js plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface Column {
  id:
    | 'PeriodStart'
    | 'AirTemp'
    | 'Dhi'
    | 'Dni'
    | 'Ebh'
    | 'Ghi'
    | 'WindSpeed10m'
    | 'WindDirection10m'
    | 'CloudOpacity';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'PeriodStart',
    label: 'Tiempo',
    minWidth: 120,
    align: 'center',
    format: (value: number) => {
      return dayjs.utc(value).local().format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    id: 'AirTemp',
    label: 'Temperatura del aire',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'Dhi',
    label: 'Dhi',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'Dni',
    label: 'Dni',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'Ebh',
    label: 'Ebh',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'Ghi',
    label: 'Ghi',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'WindSpeed10m',
    label: 'Velocidad del viento',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'WindDirection10m',
    label: 'Dirección del viento',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'CloudOpacity',
    label: 'Opacidad de nubes',
    minWidth: 80,
    align: 'center',
  },
];

interface TableMUIProps {
  rows: any;
}

const TableMUI: React.FC<TableMUIProps> = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: 1400 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.PeriodStart}
                  >
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableMUI;
