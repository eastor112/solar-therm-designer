import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputField from '../../InputField/InputField';
import PlaceSelector from '../../PlaceSelector/PlaceSelector';
import { Dayjs } from 'dayjs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const fieldInfo = {
  latitud: {
    label: 'Latitud',
    tooltip: 'Ingrese la latitud del proyecto',
    initialValue: 0,
  },
  longitud: {
    label: 'Longitud',
    tooltip: 'Ingrese la longitud del proyecto',
    initialValue: 0,
  },
  t_amb: {
    label: 'Temperatura Ambiente',
    tooltip: 'Ingrese la temperatura ambiente',
    initialValue: 0,
  },
  v_viento: {
    label: 'Velocidad del Viento',
    tooltip: 'Ingrese la velocidad del viento',
    initialValue: 0,
  },
  altura: {
    label: 'Altura',
    tooltip: 'Ingrese la altura del proyecto',
    initialValue: 33,
  },
};

const validationSchema = yup.object().shape({
  name_project: yup.string().required('Nombre del proyecto es requerido'),
  place: yup.string().required('Lugar es requerido'),
  latitud: yup.number().required('Latitud es requerida'),
  longitud: yup.number().required('Longitud es requerida'),
  t_amb: yup.number().required('Temperatura ambiente es requerida'),
  v_viento: yup.number().required('Velocidad del viento es requerida'),
  altura: yup.number().required('Altura es requerida'),
  date: yup.date().required('Fecha y hora son requeridas'),
});

const ModalUpdateGeneralParams: React.FC = () => {
  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.entries(fieldInfo).map(([key, value]) => [key, value.initialValue])
    ),
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('here');
      console.log(values);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Información del Proyecto
        </Typography>

        <InputField
          id='name_project'
          label='Nombre de proyecto'
          variant='outlined'
          name='name_project'
          value={formik.values['name_project']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched['name_project'] &&
            Boolean(formik.errors['name_project'])
          }
          helperText={
            formik.touched['name_project'] && formik.errors['name_project']
          }
          margin='normal'
        />

        <PlaceSelector
          onChange={value => formik.setFieldValue('place', value)}
        />

        <form onSubmit={formik.handleSubmit}>
          {Object.entries(fieldInfo).map(([field, info]) => (
            <React.Fragment key={field}>
              {field !== 'date' ? (
                <InputField
                  fullWidth
                  id={field}
                  name={field}
                  label={info.label}
                  type={
                    field === 't_amb' ||
                    field === 'v_viento' ||
                    field === 'altura'
                      ? 'number'
                      : 'text'
                  }
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field] && Boolean(formik.errors[field])}
                  helperText={formik.touched[field] && formik.errors[field]}
                  margin='normal'
                  tooltipText={info.tooltip}
                />
              ) : null}
            </React.Fragment>
          ))}

          <DateTimePicker
            label={'Fecha y hora'}
            value={formik.values.date}
            onChange={value =>
              formik.setFieldValue('date', (value as Dayjs | null)?.format())
            }
            slotProps={{
              textField: {
                size: 'small',
                margin: 'normal',
                InputLabelProps: { shrink: true },
                inputProps: { placeholder: 'Seleccione' },
              },
            }}
            format='DD/MM/YYYY HH:mm'
            sx={{ width: '100%' }}
            minutesStep={30}
            ampm={false}
          />

          <Box sx={{ display: 'flex' }}>
            <Button type='button' sx={{ mt: 2 }}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' sx={{ mt: 2 }}>
              Aceptar
            </Button>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default ModalUpdateGeneralParams;
