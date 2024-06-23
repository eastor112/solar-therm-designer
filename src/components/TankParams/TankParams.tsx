import React from 'react';
import Box from '@mui/material/Box';
import InputField from '../InputField/InputField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { ModalType, getModalSelector } from '../Modal/getModalSelector';
import { setModalComponent, setOpenModal } from '../../redux/UISlice';
import Settings from '../Settings/Settings';
import { generalStyles } from '../../styles/general';

const fieldInfo = {
  vol_tk: {
    label: 'Volumen [m3]',
    tooltip: 'Volumen del tanque de agua [m3]',
    initialValue: 0.3,
  },
  e_tk: {
    label: 'Espesor tanque [m]',
    tooltip: 'Espesor del termotanque (acero inoxidable) [m]',
    initialValue: 0.0004,
  },
  e_aisl: {
    label: 'Espesor aislante [m]',
    tooltip: 'Espesor del aislante (poliuretano) [m]',
    initialValue: 0.005,
  },
  e_cub: {
    label: 'Espesor cubierta [m]',
    tooltip: 'Espesor de la cubierta (acero inoxidable) [m]',
    initialValue: 0.0004,
  },
};

const validationSchema = yup.object({
  vol_tk: yup
    .number()
    .required('Volumen es requerido')
    .positive('Debe ser un número positivo'),
  e_tk: yup
    .number()
    .required('Espesor tanque es requerido')
    .positive('Debe ser un número positivo'),
  e_aisl: yup
    .number()
    .required('Espesor aislante es requerido')
    .positive('Debe ser un número positivo'),
  e_cub: yup
    .number()
    .required('Espesor cubierta es requerido')
    .positive('Debe ser un número positivo'),
});

const TankParams: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.entries(fieldInfo).map(([key, value]) => [key, value.initialValue])
    ),
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  const handleSetCoeficients = () => {
    dispatch(setOpenModal(true));
    dispatch(setModalComponent(getModalSelector[ModalType.OTHER_TANK_PARAMS]));
  };

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Tanque
      </Typography>
      <Box sx={{ width: '200px' }}>
        <form onSubmit={formik.handleSubmit}>
          {Object.entries(fieldInfo).map(([field, info]) => (
            <InputField
              key={field}
              id={field}
              name={field}
              label={info.label}
              type='number'
              value={formik.values[field as keyof typeof formik.values]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field as keyof typeof formik.touched] &&
                Boolean(formik.errors[field as keyof typeof formik.errors])
              }
              helperText={
                formik.touched[field as keyof typeof formik.touched] &&
                formik.errors[field as keyof typeof formik.errors]
              }
              tooltipText={info.tooltip}
              sx={{ width: '100%', mb: 2 }}
              size='small'
              margin='normal'
            />
          ))}
        </form>
      </Box>
      <Settings label='Coeficientes' onClick={handleSetCoeficients} />
    </Box>
  );
};

export default TankParams;
