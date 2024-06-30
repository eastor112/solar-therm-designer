import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputField from '../../InputField/InputField';
import PlaceSelector from '../../PlaceSelector/PlaceSelector';
import { Dayjs } from 'dayjs';
import MapLeafleat from '../../MapLeafleat/MapLeafleat';
import ButtonsModals from '../../ButtonsModals/ButtonsModals';
import { useDesignerStore } from '../../../store/designerStore';
import dayjs from '../../../utils/datesUtils';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '90vw',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
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

const ModalGeneralParams: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const {
    name_project,
    place,
    latitud,
    longitud,
    t_amb,
    v_viento,
    altura,
    date,
    setName_project,
    setPlace,
    setLatitud,
    setLongitud,
    setT_amb,
    setV_viento,
    setAltura,
    setDate,
  } = useDesignerStore();

  // const complexFields = {
  //   name_project: {
  //     label: 'Nombre del Proyecto',
  //     tooltip: 'Ingrese el nombre del proyecto',
  //     initialValue: name_project,
  //   },
  //   place: {
  //     label: 'Lugar',
  //     tooltip: 'Ingrese el lugar del proyecto',
  //     initialValue: place,
  //   },
  // };

  const fieldInfo = {
    latitud: {
      label: 'Latitud',
      tooltip: 'Ingrese la latitud del proyecto',
    },
    longitud: {
      label: 'Longitud',
      tooltip: 'Ingrese la longitud del proyecto',
    },
    t_amb: {
      label: 'Temperatura Ambiente',
      tooltip: 'Ingrese la temperatura ambiente',
    },
    v_viento: {
      label: 'Velocidad del Viento',
      tooltip: 'Ingrese la velocidad del viento',
    },
    altura: {
      label: 'Altura',
      tooltip: 'Ingrese la altura del proyecto',
    },
  };

  const initialValues = {
    name_project,
    place,
    latitud,
    longitud,
    t_amb,
    v_viento,
    altura,
    date,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      setName_project(values.name_project);
      setPlace(values.place);
      setLatitud(Number(values.latitud));
      setLongitud(Number(values.longitud));
      setT_amb(Number(values.t_amb));
      setV_viento(Number(values.v_viento));
      setAltura(Number(values.altura));
      setDate(values.date);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Información del Proyecto
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ width: '250px' }}>
            <form onSubmit={formik.handleSubmit}>
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
                  formik.touched['name_project'] &&
                  formik.errors['name_project']
                }
                margin='normal'
              />

              <PlaceSelector
                onChange={value => formik.setFieldValue('place', value)}
                onShowMap={value => {
                  setShowMap(value);
                }}
                showMap={showMap}
              />

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
                      value={formik.values[field as keyof typeof formik.values]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched[field as keyof typeof formik.values] &&
                        Boolean(
                          formik.errors[field as keyof typeof formik.values]
                        )
                      }
                      helperText={
                        formik.touched[field as keyof typeof formik.values] &&
                        formik.errors[field as keyof typeof formik.values]
                      }
                      margin='normal'
                      tooltipText={info.tooltip}
                    />
                  ) : null}
                </React.Fragment>
              ))}

              <DateTimePicker
                label={'Fecha y hora'}
                value={
                  formik.values.date ? dayjs(formik.values.date) : undefined
                }
                onChange={(value: any) => {
                  formik.setFieldValue(
                    'date',
                    (value as Dayjs | null)?.format()
                  );
                }}
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

              <ButtonsModals
                isSubmit
                handleAccept={() => {}}
                handleCancel={() => {}}
              />
            </form>
          </Box>
          {showMap && (
            <Box sx={{ width: '69.5vw', height: '560px', bgcolor: 'red' }}>
              <MapLeafleat
                onMarkerClick={() => {}}
                defaultCoordinates={{
                  lat: -8.11599,
                  lon: -79.02998,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default ModalGeneralParams;
