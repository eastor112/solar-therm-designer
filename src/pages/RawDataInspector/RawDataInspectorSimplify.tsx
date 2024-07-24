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

interface RawDataInspectorProps {
  title: string;
}

const RawDataInspectorSimplify: FC<RawDataInspectorProps> = ({ title }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(null);

  const { results, pvgisData, getPVGISData } = useDesignerStore();

  useEffect(() => {
    if (!results) {
      navigate('/dashboard/designer');
    }
  }, []);

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
              <Button variant='contained'>Exportar .csv</Button>
            </Box>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 2 }}
            >
              <Typography variant='h3' sx={{ ...generalStyles.h3, py: 2 }}>
                Filtrar por fecha
              </Typography>
              <DesktopDatePicker
                key={date ? date.toString() : 'empty'}
                defaultValue={date}
                label='Fecha de análisis'
                sx={{
                  width: '100%',
                }}
                format='DD/MM/YYYY'
                onChange={handleChange}
                maxDate={dayjs('31/12/2021', 'DD/MM/YYYY')}
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
            <PVGISTable rows={pvgisData} title={title} />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default RawDataInspectorSimplify;
