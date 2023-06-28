import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setDate } from '../../redux/locationsSlice';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

interface ModalDatepickerProps {
  handleClose: () => void;
}

const ModalDatepicker: React.FC<ModalDatepickerProps> = ({ handleClose }) => {
  const { date } = useAppSelector(state => state.locations);
  const dispatch = useAppDispatch();

  const [currentDate, setCurrentDate] = useState<Dayjs>(
    date ? dayjs(date, 'DD/MM/YYYY') : dayjs()
  );

  const handleChange = (value: Dayjs | null) => {
    if (!value) return;
    setCurrentDate(value);
  };

  const handleSaveDate = () => {
    dispatch(setDate(currentDate.format('DD/MM/YYYY')));
    handleClose();
  };

  return (
    <Box sx={style}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Fecha de estudio
        </Typography>

        <Typography
          id='modal-modal-title'
          variant='subtitle1'
          component='p'
          sx={{ fontSize: '0.9rem', mt: 1, mb: 2 }}
        >
          La fecha de análisis que datos climáticos seran utilizados para
          evaluar el diseño.
        </Typography>

        <DesktopDatePicker
          defaultValue={currentDate}
          label='Fecha de análisis'
          sx={{
            width: '100%',
          }}
          format='DD/MM/YYYY'
          onChange={handleChange}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Button
            variant='outlined'
            sx={{
              mt: 2,
            }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            sx={{
              mt: 2,
            }}
            onClick={handleSaveDate}
          >
            Guardar
          </Button>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default ModalDatepicker;
