import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { FC, useEffect, useState } from 'react';
import { useDesignerStore } from '../../store/designerStore';
import PVGISTable from '../../components/Tables/PVGISTable';
import Button from '@mui/material/Button';
import AnglesDesignerSimplify from '../../components/AnglesDesigner/AnglesDesignerSimplify';
import GeneralData from '../../components/GeneralData/GeneralData';
import Typography from '@mui/material/Typography';
import { generalStyles } from '../../styles/general';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from '../../utils/datesUtils';
import { Dayjs } from 'dayjs';
import { exportJsonToCsv } from '../../utils/exportData';
import { PVGISRegister } from '../../services/projectsServices';

interface RawDataInspectorProps {
  title: string;
}

const RawDataInspectorSimplify: FC<RawDataInspectorProps> = ({ title }) => {
  const navigate = useNavigate();
  const { results, pvgisData, getPVGISData } = useDesignerStore();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [filteredData, setFilteredData] = useState<PVGISRegister[]>(pvgisData);

  useEffect(() => {
    if (!results) {
      navigate('/dashboard/designer');
    }
  }, []);

  useEffect(() => {
    if (date) {
      const filtered = pvgisData.filter(data =>
        dayjs(data.time).isSame(date, 'day')
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(pvgisData);
    }
  }, [date, pvgisData]);

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            padding: 3,
            height: '100vh',
          }}
        >
          <Box
            sx={{
              position: 'fixed',
              bgcolor: 'white',
              height: '92vh',
              p: '20px',
              borderRadius: '4px',
            }}
          >
            <Button
              onClick={() => {
                navigate('/dashboard/designer');
              }}
            >
              {'<- Regresar'}
            </Button>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 2 }}
            >
              <GeneralData hideButton />
              <AnglesDesignerSimplify width={230} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <Button
                variant='contained'
                onClick={() => {
                  getPVGISData();
                }}
              >
                Obterner data
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  exportJsonToCsv(filteredData, 'PVGIS-DATA');
                }}
              >
                Exportar .csv
              </Button>
            </Box>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 2 }}
            >
              <Typography variant='h3' sx={{ ...generalStyles.h3, py: 2 }}>
                Filtrar por fecha
              </Typography>
              <DesktopDatePicker
                key={date ? date.toString() : 'empty'}
                views={['month', 'day']}
                defaultValue={date}
                label='Día y mes'
                sx={{
                  width: '100%',
                }}
                format='DD/MM'
                onChange={handleChange}
                maxDate={dayjs('31/12/2020', 'DD/MM/YYYY')}
                minDate={dayjs('01/01/2019', 'DD/MM/YYYY')}
              />
              <Button
                variant='contained'
                onClick={() => {
                  setDate(null);
                }}
              >
                Eliminar filtro
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: 1, ml: '290px' }}>
            <PVGISTable rows={filteredData} title={title} />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default RawDataInspectorSimplify;
